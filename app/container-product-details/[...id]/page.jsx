"use client";
import AffiliateProductDetails from "@/app/components/customerDashboard/affiliate/affiliateproducts/AffiliateProductDetails";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import { getAffiliateContainerDetails } from "@/app/services/affiliate/affiliateproducts/getAffiliateContainerDetails";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState, useTransition } from "react";

const AffiliateProductDetailsPage = ({ params }) => {
    const [productDetails, setProductDetails] = useState({});
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();

    // Ensure params.id is defined and destructure properly
    const [Id, containerId] = params?.id || [];

    useEffect(() => {
        const containerDetailHandle = async () => {
            try {
                startTransition(async () => {
                    const fetchContainerDetails =
                        await getAffiliateContainerDetails(
                            session?.accessToken,
                            containerId,
                            Id
                        );
                    const productDetailsRes = fetchContainerDetails?.results;
                    setProductDetails(productDetailsRes);
                });
            } catch (error) {
                console.error(error);
            }
        };

        // Only fetch data when authenticated, session is available, and both Id and containerId exist
        if (
            status === "authenticated" &&
            session?.accessToken &&
            containerId &&
            Id
        ) {
            containerDetailHandle();
        }
    }, [status, Id, containerId, session?.accessToken]);

    const hasProductDetails =
        productDetails && Object.keys(productDetails).length > 0;

    return (
        <Suspense fallback={<h1>Loading....</h1>}>
            <div>
                {isPending ? (
                    <DefaultLoader />
                ) : hasProductDetails ? (
                    <AffiliateProductDetails productDetails={productDetails} />
                ) : (
                    <h2>No product details available.</h2>
                )}
            </div>
        </Suspense>
    );
};

export default AffiliateProductDetailsPage;
