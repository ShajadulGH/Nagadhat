"use client"
import ResaleShippingProduct from '@/app/components/customerDashboard/affiliate/affiliateproducts/ResaleShippingProduct';
import CustomerAddress from '@/app/components/shippingPage/customerAddress/CustomerAddress';
import { getResaleOrderByOrderId } from '@/app/services/affiliate/getResaleOrderByOrderId';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ShippingOrderSectionResale from '@/app/components/customerDashboard/affiliate/affiliateproducts/ShippingOrderSectionResale';

import { useRouter } from 'next/navigation';
import LodingFixed from '@/app/components/LodingFixed';
import { updateResalePlaceOrder } from '@/app/services/affiliate/affiliateproducts/updateResalePlaceOrder';

const page = ({ params }) => {
    const [customerAddress, setCustomerAddress] = useState([]);
    const [selectedDefaultAddressId, setSelectedDefaultAddressId] =
        useState(null);
    const [deliveryNote, setDeliveryNote] = useState("");
    const [cartProduct, setCartProduct] = useState([]);
    const [pickUpIdForOrder, setPickUpIdForOrder] = useState(null);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const { status, data: session } = useSession();
    const orderId = params?.orderId;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Set default address ID when customerAddress changes
        const defaultAddress = customerAddress.find(address => address.set_default === 1);
        if (defaultAddress) {
            setSelectedDefaultAddressId(defaultAddress.id);
        }
        if (pickUpIdForOrder) {
            setSelectedDefaultAddressId(null);
        }
    }, [customerAddress, pickUpIdForOrder]);

    const handlePlaceOrder = async () => {
        if (session.accessToken) {
            setLoading(true);
            try {
                const data ={
                    shipping_address_id: selectedDefaultAddressId,
                    outlet_pickup_point_id: pickUpIdForOrder,
                    delivery_note: deliveryNote
                };
                const response = await updateResalePlaceOrder(session.accessToken, data);
                if (response.code === 200) {
                    router.push(`/thankyou?orderId=${response?.results?.order_id}`);
                }else{
                    toastr.error(response.message)
                    console.log(response.message);
                }
            } catch (error) {
                console.error("Error fetching IP information:", error);
            }finally{
                setLoading(false);
            }
        }else{
            console.log("User not logged in");
        }
        
    };

    // Fetch Order information
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                if (session?.accessToken && orderId) {
                    // Fetch Order information from API
                    const response = await getResaleOrderByOrderId(session.accessToken, orderId);
                    setSubTotal(response?.results.sub_total);
                    setTotalPrice(response?.results.grand_total);
                    // Assuming response contains the product list, set cartProduct accordingly
                    setCartProduct(response?.results?.products || []);  // Update as per actual response structure
                }
            } catch (error) {
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [session?.accessToken, orderId]);

    return (
        <>
            <section className="shipping-section-area nh-new-shipping-wrapper">
                {loading && <LodingFixed/>}
                <div className="container">
                    <div className="row gy-5 gy-lg-0 gx-0 gx-lg-5">
                        <div className="col-lg-8">
                            <CustomerAddress
                                setPickUpIdForOrder={
                                    setPickUpIdForOrder
                                }
                                setShippingPrice={setShippingPrice}
                                setDeliveryNote={setDeliveryNote}
                                customerAddress={customerAddress}
                                setCustomerAddress={setCustomerAddress}
                                selectedDefaultAddressId={selectedDefaultAddressId} setSelectedDefaultAddressId={setSelectedDefaultAddressId}
                                cartProduct={cartProduct}
                            />

                            {/* shows add to card product */}
                            <ResaleShippingProduct
                                cartProduct={cartProduct}
                            />
                        </div>
                        <div className="col-lg-4">
                            <ShippingOrderSectionResale
                                subTotal={subTotal}
                                totalPrice={totalPrice}
                                shippingPrice={shippingPrice}
                                handlePlaceOrder={handlePlaceOrder}
                                isTermsChecked={isTermsChecked}
                                setIsTermsChecked={setIsTermsChecked}
                                customerAddress={customerAddress}
                                cartProduct={cartProduct}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
