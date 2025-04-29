"use client";
import LodingFixed from "@/app/components/LodingFixed";
import { addToCartQuantityUpdate } from "@/app/services/addToCartQuantityUpdate";
import { postContainerPlaceOrder } from "@/app/services/affiliate/affiliateproducts/postContainerPlaceOrder";
import { containerCartQuantityUpdate } from "@/app/services/containerCartQuantityUpdate";
import { deleteCartProduct } from "@/app/services/getDeleteCartProduct";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContainerOrderDetails = ({
  selectedProducts,
  setSelectedProducts,
  availableQuantity,
  availableValue,
  session,
  getTotalQuantity,
  setLoading,
  loading,
  setCartProductsRender,
  cartProductsRerender,
  containerId
}) => {
  const [outletId, setOutletId] = useState(0);
  const [districtId, setDistrictId] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [localQuantities, setLocalQuantities] = useState({});
  const router = useRouter();

  // Initialize local quantities
  useEffect(() => {
    const initialQuantities = {};
    selectedProducts.forEach(product => {
      initialQuantities[product.product_id] = product.quantity.toString();
    });
    setLocalQuantities(initialQuantities);
  }, [selectedProducts]);

  useEffect(() => {
    const initialOutletId = localStorage.getItem("outletId");
    setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
  }, []);

  useEffect(() => {
    const initialDistrictId = localStorage.getItem("districtId");
    setDistrictId(initialDistrictId ? parseInt(initialDistrictId) : 47);
  }, []);

  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const handleIncrease = async (productId, cartId) => {
    const quantityUpdateInfo = {
      cart_id: cartId,
      outlet_id: outletId,
      quantity: "increment",
    };
    try {
      setLoading(true);
      const incrementApi = await addToCartQuantityUpdate(
        quantityUpdateInfo,
        session?.accessToken
      );
      if (incrementApi.code == 200) {
        setCartProductsRender(!cartProductsRerender);
      } else {
        toast.error(incrementApi.message);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error("Error updating cart quantity.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async (productId, cartId) => {
    const quantityUpdateInfo = {
      cart_id: cartId,
      outlet_id: outletId,
      quantity: "decrement",
    };
    try {
      setLoading(true);
      const decrementApi = await addToCartQuantityUpdate(
        quantityUpdateInfo,
        session?.accessToken
      );
      if (decrementApi.code == 200) {
        setCartProductsRender(!cartProductsRerender);
      } else {
        toast.error(decrementApi.message);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error("Error updating cart quantity.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, event, cartId) => {
    const inputValue = event.target.value;
    
    // Only allow numeric input or empty string
    if (inputValue !== '' && !/^\d*$/.test(inputValue)) {
      return;
    }

    // Update local state immediately
    setLocalQuantities(prev => ({
      ...prev,
      [productId]: inputValue
    }));

    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout for API call
    const timeout = setTimeout(async () => {
      if (inputValue === '') {
        toast.error("Quantity cannot be empty");
        // Reset to previous valid quantity
        const currentProduct = selectedProducts.find(p => p.product_id === productId);
        setLocalQuantities(prev => ({
          ...prev,
          [productId]: currentProduct.quantity.toString()
        }));
        return;
      }

      const finalQuantity = parseInt(inputValue, 10);
      const totalQuantity = getTotalQuantity();
      const currentProduct = selectedProducts.find(
        (product) => product.product_id === productId
      );
      const remainingQuantity = availableQuantity - (totalQuantity - currentProduct.quantity);

      if (isNaN(finalQuantity)) {
        toast.error("Please enter a valid number");
        return;
      }

      if (finalQuantity < 1) {
        toast.error("Quantity must be at least 1");
        // Reset to previous valid quantity
        setLocalQuantities(prev => ({
          ...prev,
          [productId]: currentProduct.quantity.toString()
        }));
        return;
      }

      if (finalQuantity > remainingQuantity) {
        toast.error(`Booked quantity cannot exceed ${remainingQuantity}`);
        // Reset to previous valid quantity
        setLocalQuantities(prev => ({
          ...prev,
          [productId]: currentProduct.quantity.toString()
        }));
        return;
      }

      const quantityUpdateInfo = {
        cart_id: cartId,
        outlet_id: outletId,
        quantity: finalQuantity,
      };
      
      try {
        setLoading(true);
        const quantityUpdate = await containerCartQuantityUpdate(
          quantityUpdateInfo,
          session?.accessToken
        );
        if (quantityUpdate.code == 200) {
          setCartProductsRender(!cartProductsRerender);
        } else {
          toast.error(quantityUpdate.message);
          // Reset to previous valid quantity if API fails
          setLocalQuantities(prev => ({
            ...prev,
            [productId]: currentProduct.quantity.toString()
          }));
        }
      } catch (error) {
        console.error('Error updating product quantity:', error);
        toast.error("Error updating product quantity.");
        // Reset to previous valid quantity on error
        setLocalQuantities(prev => ({
          ...prev,
          [productId]: currentProduct.quantity.toString()
        }));
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms delay after typing stops

    setTypingTimeout(timeout);
  };

  const handleDeleteSelectedProducts = async (productId, cartId) => {
    try {
      setLoading(true);
      const deleteProduct = await deleteCartProduct(
        cartId,
        session?.accessToken
      );
      if (deleteProduct.code == 200) {
        setCartProductsRender(!cartProductsRerender);
        toast.success("Product deleted successfully.");
      } else {
        toast.error(deleteProduct.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Error occurred while deleting the product.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    let totalPrice = 0;
    let finalTotal = 0;

    selectedProducts.forEach(product => {
      const quantity = parseInt(localQuantities[product.product_id] || product.quantity, 10);
      totalPrice += product.regular_price * quantity;
      finalTotal += product.price * quantity;
    });

    const discount = totalPrice - finalTotal;

    return { totalPrice, discount, finalTotal };
  };

  const { totalPrice, discount, finalTotal } = calculateTotals();

  const handleBookingNow = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Please add products to cart");
      return;
    }

    if (availableValue < finalTotal) {
      toast.error("Booked value cannot exceed the total available value");
      return;
    }

    if (availableQuantity < getTotalQuantity()) {
      toast.error("Booked quantity cannot exceed the total available quantity");
      return;
    }

    const containerOrder = {
      outlet_id: outletId,
      location_id: districtId,
      container_id: containerId,
      sub_total: totalPrice,
      discount_amount: discount,
      total_products_price: finalTotal,
      grand_total: finalTotal,
      payment_type: "",
      outlet_pickup_point_id: null,
      order_product_type: "3",
      container_order_items: selectedProducts.map((product) => ({
        product_id: product?.product_id,
        product_quantity: parseInt(localQuantities[product.product_id] || product.quantity, 10),
        product_regular_price: product?.regular_price,
        product_variation_id: product?.product_variation_id,
        product_shipping_charge: 0,
        product_discount_type: product?.discount_type || "",
        product_discount_amount: product?.discountPrice || 0,
        product_unit_price: product?.price,
        vendor_id: product.product_variation_id || "",
        thumbnail: product?.product_thumbnail,
      })),
    };

    try {
      setLoading(true);
      const response = await postContainerPlaceOrder(
        containerOrder,
        session?.accessToken
      );

      if (!response.error) {
        const { order_product_type, order_id } = response?.results;
        router.push(
          `/paynow?orderId=${order_id}&order_product_type=${order_product_type}`
        );
      } else {
        toast.error("Failed to place container order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row gy-3 gx-2 p-4">
      <div className="col-md-8 overflow-x-auto">
        <div className="container-booking-oder-table">
          <h3>Order Details</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => {
                  const quantity = localQuantities[product.product_id] || product.quantity;
                  const displayQuantity = typeof quantity === 'number' ? quantity.toString() : quantity;
                  
                  return (
                    <tr key={product.id}>
                      <td>
                        <Image
                          className="rounded-3"
                          height={50}
                          width={50}
                          src={`${NagadhatPublicUrl}/${product.product_thumbnail}`}
                          alt={product.product_name}
                        />
                        <span className="ms-2">{truncateTitle(product.product_name, 20)}</span>
                      </td>

                      <td className="align-middle text-center w-auto">
                        <div className="d-flex align-items-center w-auto justify-content-center">
                          <div className="product-details-inner-quantity product-details-inner-qty d-flex align-items-center w-auto justify-content-center">
                            <input
                              type="text"
                              value={displayQuantity}
                              onChange={(e) => handleQuantityChange(product.product_id, e, product.cart_id)}
                              className="text-center"
                            />
                            <div className="d-flex flex-column ms-1">
                              <button
                                className="product-details-quantity-btn"
                                type="button"
                                onClick={() => handleIncrease(product.product_id, product.cart_id)}
                                disabled={availableValue < finalTotal}
                              >
                                <MdOutlineKeyboardArrowUp />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDecrease(product.product_id, product.cart_id)}
                              >
                                <MdOutlineKeyboardArrowDown />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <div className="d-flex flex-column align-items-center">
                          <strong className="text-success">
                            ৳ {(product.price * (parseInt(quantity) || 0)).toFixed(2)}
                          </strong>
                          <del className="text-secondary">
                            ৳ {(product.regular_price * (parseInt(quantity) || 0)).toFixed(2)}
                          </del>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <button
                          className="text-danger btn btn-link p-0"
                          title="Delete"
                        >
                          <FaTrashAlt onClick={() => handleDeleteSelectedProducts(product.product_id, product.cart_id)} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="container-booking-oder-table">
          <h3>Order Amount</h3>
          <table className="table table-borderless container-booking-oder-amount-table">
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td className="text-end">৳ {totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td className="text-end">৳ {discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td className="text-end">
                  ৳ <strong>{finalTotal.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="overflow-hidden">
            <button
              onClick={handleBookingNow}
              disabled={
                selectedProducts.length === 0 || 
                availableValue < finalTotal || 
                availableQuantity < getTotalQuantity()
              }
              className={`add-to-cart-link rounded-bottom border-0 d-block w-100 ${
                (selectedProducts.length === 0 || 
                 availableValue < finalTotal || 
                 availableQuantity < getTotalQuantity()) ? 'disabled' : ''
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {loading && <LodingFixed />}
    </div>
  );
};

export default ContainerOrderDetails;