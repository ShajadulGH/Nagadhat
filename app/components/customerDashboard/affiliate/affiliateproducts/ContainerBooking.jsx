"use client";
import { getAffiliateContainer } from "@/app/services/affiliate/affiliateproducts/getAffiliateContainer";
import ContainerBookingProduct from "./ContainerBookingProduct";
import ContainerOrderDetails from "./ContainerOrderDetails";
import ContainerTopInfo from "./ContainerTopInfo";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";
import ContainerHorizontalScroll from "./ContainerHorizontalScroll";
import { getActiveContainers } from "@/app/services/affiliate/affiliateproducts/getActiveContainers";
import { getContainerCartProduct } from "@/app/services/affiliate/affiliateproducts/getContainerCartProduct";
import LodingFixed from "@/app/components/LodingFixed";
import { toast } from "react-toastify";

const ContainerBooking = ({ isActive }) => {
    const [isPending, startTransition] = useTransition();
    const [containerData, setContainerData] = useState({});
    const [containerProduct, setContainerProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [activeContainerData, setActiveContainerData] = useState([]);
    const [containerActiveId, setContainerActiveId] = useState(null);
    const [quantityFull, setQuantityFull] = useState(1);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [cartProductsRerender, setCartProductsRender] = useState(false);

    useEffect(() => {
        if (session?.accessToken) {
            const fetchActiveContainer = async () => {
                try {
                    startTransition(async () => {
                        const response = await getActiveContainers(
                            session?.accessToken
                        );
                        if (response?.code === 200) {
                            setActiveContainerData(response?.results);
                        } else {
                            console.log(response?.message);
                        }
                    });
                } catch (error) {
                    console.error("Failed to fetch container data:", error);
                }
            };
            fetchActiveContainer();
        }
    }, [session?.accessToken]);

    useEffect(() => {
        if (session?.accessToken) {
            const fetchAffiliateContainer = async () => {
                try {
                    startTransition(async () => {
                        const containerResponse = await getAffiliateContainer(
                            session?.accessToken,
                            containerActiveId
                        );
                        if (containerResponse?.code === 200) {
                            setContainerData(containerResponse?.results);
                            setContainerProduct(
                                containerResponse?.results?.products
                            );
                        } else {
                            console.log(containerResponse?.message);
                            toast.error(
                                "Container not available or expired"
                            );
                        }
                    });
                } catch (error) {
                    console.error("Failed to fetch container data:", error);
                }
            };
            fetchAffiliateContainer();
        }
    }, [session?.accessToken, containerActiveId]);

    useEffect(() => {
        // get continer cart products from server
        const fetchContainerCartProducts = async () => {
            try {
                const response = await getContainerCartProduct(session?.accessToken);
                if (response?.success) {
                    setSelectedProducts(response?.data);
                } else {
                    console.log(response?.message);
                }
            } catch (error) {
                console.error("Failed to fetch container data:", error);
            }
        };
        fetchContainerCartProducts();
    }, [session?.accessToken, cartProductsRerender]);

    const availableQuantity = containerData?.quantity - containerData?.booked_quantity;
    const availableValue = containerData?.container_value - containerData?.booked_value;
    const progressBarValue = containerData?.progress_bar_value;

    const getTotalQuantity = () => {
        return selectedProducts.reduce(
            (acc, product) => acc + product.quantity, 0
        );
    };

    return (
        <>
            <div
                className={`tab-pane fade ${isActive ? "show active" : ""}`}
                id="container-booking"
                role="tabpanel"
            >
                {/* {loading && <div className="loading-overlay"> <LodingFixed /> </div>} */}
                <ContainerHorizontalScroll
                    activeContainerData={activeContainerData}
                    isPending={isPending}
                    setContainerActiveId={setContainerActiveId}
                    containerActiveId={containerActiveId}
                />

                <ContainerTopInfo containerData={containerData} />
                {isPending ? (
                    // <DefaultLoader />
                    <h1 className="text-center">Loading...</h1>
                ) : containerProduct?.length > 0 ? (
                    <ContainerBookingProduct
                        containerProduct={containerProduct}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        containerId={containerData.id}
                        progressBarValue={progressBarValue}
                        quantityFull={quantityFull}
                        setQuantityFull={setQuantityFull}
                        availableQuantity={availableQuantity}
                        getTotalQuantity={getTotalQuantity}
                        setLoading={setLoading}
                        loading={loading}
                        setCartProductsRender={setCartProductsRender}
                        cartProductsRerender={cartProductsRerender}
                    />
                ) : (
                    <NoDataFound />
                )}

                <ContainerOrderDetails
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    availableQuantity={availableQuantity}
                    availableValue={availableValue}
                    session={session}
                    setQuantityFull={setQuantityFull}
                    quantityFull={quantityFull}
                    getTotalQuantity={getTotalQuantity}
                    setLoading={setLoading}
                    loading={loading}
                    setCartProductsRender={setCartProductsRender}
                    cartProductsRerender={cartProductsRerender}
                    containerId={containerData.id}
                />
            </div>
        </>
    );
};

export default ContainerBooking;
