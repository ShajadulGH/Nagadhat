"use client";

import AffiliateProductDetailsImg from "@/app/components/customerDashboard/affiliate/affiliateproducts/AffiliateProductDetailsImg";
import ResaleProductDetailsContent from "@/app/components/customerDashboard/affiliate/affiliateproducts/ResaleProductDetailsContent";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import ResaleProductLongDescription from "@/app/components/productDetail/ResaleProductLongDescription";
import { getAffiliateResaleProductDetail } from "@/app/services/affiliate/affiliateproducts/getAffiliateResaleProductDetail";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

const ResaleProductDetailsPage = ({ params }) => {
    const [productDetails, setProductDetails] = useState({});
    const [productGallery, setProductGallery] = useState([]);
    const [outletId, setOutletId] = useState(0);
    const { data: session, status } = useSession();

    const productId = params.Id;
    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    useEffect(() => {
        if (status === "authenticated" && productId && outletId) {
            const fetchResaleProduct = async () => {
                try {
                    const resaleProductInfo =
                        await getAffiliateResaleProductDetail(
                            session?.accessToken,
                            productId,
                            outletId
                        );
                    const resaleProductResult =
                        resaleProductInfo?.results || {};
                    setProductDetails(resaleProductResult);
                    setProductGallery(resaleProductResult?.gallery);
                } catch (error) {
                    console.error(
                        "Error fetching resale product details:",
                        error
                    );
                }
            };

            fetchResaleProduct();
        }
    }, [status, session?.accessToken, productId, outletId]);

    return (
        <>
            <PrivateRoute>
                <div className="container py-5">
                    <Suspense
                        fallback={
                            <div className=" d-flex align-items-center justify-content-center vh-100">
                                <h1 className="text-center">Loading... </h1>;
                            </div>
                        }
                    >
                        <div className="row g-5">
                            <div className="col-lg-6 px-5">
                                <AffiliateProductDetailsImg
                                    productGallery={productGallery}
                                    productDetails={productDetails}
                                />
                            </div>
                            <div className="col-lg-6">
                                <ResaleProductDetailsContent
                                    productDetails={productDetails}
                                />
                            </div>
                        </div>
                        <div>
                            <ResaleProductLongDescription
                                productInfo={productDetails}
                            />
                        </div>
                    </Suspense>
                </div>
            </PrivateRoute >
        </>
    );
};

export default ResaleProductDetailsPage;
