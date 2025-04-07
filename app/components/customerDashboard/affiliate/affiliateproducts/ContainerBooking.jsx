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

const ContainerBooking = ({ isActive }) => {
    const [isPending, startTransition] = useTransition();
    const [containerData, setContainerData] = useState({});
    const [containerProduct, setContainerProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [activeContainerData, setActiveContainerData] = useState([]);
    const [containerActiveId, setContainerActiveId] = useState(null);
    const [quantityFull, setQuantityFull] = useState(1);
    const { data: session, status } = useSession();

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
            const fetchRetailProducts = async () => {
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
                        }
                    });
                } catch (error) {
                    console.error("Failed to fetch container data:", error);
                }
            };
            fetchRetailProducts();
        }
    }, [session?.accessToken, containerActiveId]);

    useEffect(() => {
        // get continer cart products from server
        const fetchContainerCartProducts = async () => {
            try {
                const response = await getContainerCartProduct(session?.accessToken);
                console.log("container cart product ==>>", response);
                if (response?.code === 200) {
                    setSelectedProducts(response?.results);
                    console.log("container Cart Product ==>>", response?.results);
                } else {
                    console.log(response?.message);
                }
            } catch (error) {
                console.error("Failed to fetch container data:", error);
            }
        };
        fetchContainerCartProducts();
    }, [session?.accessToken]);

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
                />
            </div>
        </>
    );
};

export default ContainerBooking;
