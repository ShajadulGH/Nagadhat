"use client";
import AffiliateProductDetails from "@/app/components/customerDashboard/affiliate/affiliateproducts/AffiliateProductDetails";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";
// import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import { getAffiliateContainerDetails } from "@/app/services/affiliate/affiliateproducts/getAffiliateContainerDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";

const AffiliateProductDetailsPage = ({ params }) => {
    const [productDetails, setProductDetails] = useState({});
    const [isPending, startTransition] = useTransition();
    const [productResponse, setProductResponse] = useState(null);
    const { data: session, status } = useSession();

    // Ensure params.id is defined and destructure properly
    const [Id, containerId] = params?.id || [];

    useEffect(() => {
        if (session?.accessToken && containerId && Id) {
            const containerDetailHandle = async () => {
                try {
                    startTransition(async () => {
                        const fetchContainerDetails =
                            await getAffiliateContainerDetails(
                                session?.accessToken,
                                containerId,
                                Id
                            );
                        setProductResponse(fetchContainerDetails);

                        const productDetailsRes =
                            fetchContainerDetails?.results;
                        setProductDetails(productDetailsRes);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            containerDetailHandle();
        }
    }, [Id, containerId, session?.accessToken]);

    let hasProductDetails

    if (productResponse?.code == 404 || productResponse?.errort) {
        return <NoDataFound />;
    }else{
        hasProductDetails = Object.keys(productDetails).length > 0;
    }

    return (
        <div>
            {isPending ? (
                <DefaultLoader />
            ) : hasProductDetails ? (
                <AffiliateProductDetails productDetails={productDetails} />
            ) : (
                <DefaultLoader />
            )}
        </div>
    );
};

export default AffiliateProductDetailsPage;
