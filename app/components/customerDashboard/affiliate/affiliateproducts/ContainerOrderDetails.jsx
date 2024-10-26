"use client";
import LodingFixed from "@/app/components/LodingFixed";
import { postContainerPlaceOrder } from "@/app/services/affiliate/affiliateproducts/postContainerPlaceOrder";
import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Link from "next/link";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContainerOrderDetails = ({
    selectedProducts,
    setSelectedProducts,
    availableQuantity,
    availableValue,
    session,
    getTotalQuantity,
}) => {
    const [outletId, setOutletId] = useState(0);
    const [districtId, setDistrictId] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    useEffect(() => {
        const initialDistrictId = localStorage.getItem("districtId");
        setDistrictId(initialDistrictId ? parseInt(initialDistrictId) : 47);
    }, []);

    const handleIncrease = (productId) => {
        const totalQuantity = getTotalQuantity();
        if (totalQuantity < availableQuantity) {
            setSelectedProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        } else {
            toast.error("Booked quantity cannot exceed the total quantity.");
        }
    };

    const handleDecrease = (productId) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        const totalQuantity = getTotalQuantity();
        const currentProduct = selectedProducts.find(
            (product) => product.id === productId
        );
        const remainingQuantity =
            availableQuantity - (totalQuantity - currentProduct.quantity);

        if (
            !isNaN(newQuantity) &&
            newQuantity >= 1 &&
            newQuantity <= remainingQuantity
        ) {
            setSelectedProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, quantity: newQuantity }
                        : product
                )
            );
        } else {
            toast.error("Booked quantity cannot exceed the total quantity.");
        }
    };

    const handleDeleteSelectedProducts = (productId) => {
        const updatedProducts = selectedProducts.filter(
            (product) => product.id !== productId
        );
        setSelectedProducts(updatedProducts);
    };

    const calculateTotals = () => {
        const totalPrice = selectedProducts.reduce(
            (acc, product) => acc + product.pivot.mrp_price * product.quantity,
            0
        );

        const discount = selectedProducts.reduce(
            (acc, product) => acc + product.pivot.profit * product.quantity,
            0
        );

        const finalTotal = totalPrice - discount;

        return { totalPrice, discount, finalTotal };
    };
    const { totalPrice, discount, finalTotal } = calculateTotals();
    if (availableValue < finalTotal) {
        toast.error("Booked Pricr cannot exceed the total value.");
    }

    //function for handleBookingNow

    const containerIds = selectedProducts
        .map((item) => item?.pivot?.container_id)
        .filter((id) => id !== undefined && id !== null);
    const uniqueContainerIds = [...new Set(containerIds)];
    const singleContainerId = uniqueContainerIds[0] || null;

    const handleBookingNow = async () => {
        if (selectedProducts.length > 0 && availableValue >= finalTotal) {
            const containerOrder = {
                outlet_id: outletId,
                location_id: districtId,
                container_id: singleContainerId,
                sub_total: totalPrice,
                discount_amount: discount,
                total_products_price: finalTotal,
                grand_total: finalTotal,
                payment_type: "cash_on_delivery",
                outlet_pickup_point_id: 1,
                order_product_type: "3",
                container_order_items: selectedProducts.map((product) => ({
                    product_id: product?.id,
                    product_quantity: product?.quantity,
                    product_regular_price: product?.pivot?.mrp_price,
                    product_variation_id: null,
                    product_shipping_charge: 0,
                    product_discount_type: "",
                    product_discount_amount: product?.pivot?.profit || 0,
                    product_unit_price: product?.pivot?.trade_price,
                    vendor_id: product.vendor_id || "",
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
                    // if (typeof window !== "undefined") {
                    //     toast.success("Order placed successfully");
                    // }
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
        } else {
            toast.error("Cannot proceed: total exceeds available value.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="row gy-3 p-4">
                <div className="col-md-8 overflow-x-auto">
                    <div
                        className="container-booking-oder-table"
                        style={{ minWidth: "400px" }}
                    >
                        <h3>Order Details</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Details</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <Image
                                                height={50}
                                                width={50}
                                                src={`${NagadhatPublicUrl}/${product.product_thumbnail}`}
                                                alt={product.product_name}
                                            />
                                        </td>
                                        <td>{product.product_name}</td>
                                        <td className="align-middle">
                                            <div
                                                className="btn-group px-1 quantity-area container-booking-quantity-area"
                                                role="group"
                                                aria-label="Basic example"
                                            >
                                                <button
                                                    type="button"
                                                    className="quantity-decrease"
                                                    onClick={() =>
                                                        handleDecrease(
                                                            product.id
                                                        )
                                                    }
                                                    style={{ fontSize: "16px" }}
                                                >
                                                    <FaMinus />
                                                </button>
                                                <input
                                                    className="quantity-fild py-1"
                                                    min="1"
                                                    max="500"
                                                    type="text"
                                                    style={{ width: "36px" }}
                                                    value={product.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            product.id,
                                                            e
                                                        )
                                                    }
                                                    disabled={
                                                        availableValue <
                                                        finalTotal
                                                    }
                                                    readOnly={
                                                        availableValue <
                                                        finalTotal
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <button
                                                    className="quantity-increase"
                                                    type="button"
                                                    onClick={() =>
                                                        handleIncrease(
                                                            product.id
                                                        )
                                                    }
                                                    style={{ fontSize: "16px" }}
                                                    disabled={
                                                        availableValue <
                                                        finalTotal
                                                    }
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <strong>
                                                {product.pivot.mrp_price *
                                                    product.quantity}{" "}
                                                ৳
                                            </strong>
                                        </td>
                                        <td className="align-middle">
                                            <p
                                                onClick={() =>
                                                    handleDeleteSelectedProducts(
                                                        product.id
                                                    )
                                                }
                                                className="text-danger"
                                                title="Delete"
                                                style={{
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <FaTrashAlt />
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="container-booking-oder-table">
                        <h3>Order Amount</h3>
                        <table className="table table-borderless container-booking-oder-amount-table">
                            <tbody>
                                <tr>
                                    <td>Sub Total</td>
                                    <td className="text-end">{totalPrice}৳</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className="text-end">{discount}৳</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td className="text-end">
                                        <strong>{finalTotal}৳</strong>
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
                                    availableQuantity < 1
                                }
                                style={{
                                    opacity:
                                        selectedProducts.length === 0 ||
                                        availableValue < finalTotal ||
                                        availableQuantity < 1
                                            ? 0.5
                                            : 1,
                                    cursor:
                                        selectedProducts.length === 0 ||
                                        availableValue < finalTotal ||
                                        availableQuantity < 1
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                                className="add-to-cart-link rounded-bottom border-0 d-block w-100"
                            >
                                Booking Now
                            </button>
                        </div>
                    </div>
                </div>
                {loading && <LodingFixed />}
            </div>
        </>
    );
};

export default ContainerOrderDetails;
