// "use client";
// import { useEffect, useState } from "react";
import Breadcrumb from "@/app/components/productDetail/Breadcrumb";
import ProductLeftSide from "@/app/components/productDetail/ProductLeftSide";
import ProductRightSide from "@/app/components/productDetail/ProductRightSide";
// import { getProductDetails } from "@/app/services/getProductDetails";
// import { storeProductId } from "@/app/utils";
// import { useSearchParams } from "next/navigation";
// import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
// import { useSession } from "next-auth/react";
// import { recentViewProductApi } from "@/app/services/postRecentViewProduct";
import NoDataFound from "@/app/components/NoDataFound";
import RecentViewProduc from "@/app/components/RecentViewProduc";
import Service from "@/app/components/Service";

const ProductSinglePage = ({ productInfo, outletInfo }) => {
    // const { status, data: session } = useSession();
    // const [productInfo, setProductInfo] = useState({});
    // const [outletInfo, setOutletInfo] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const searchParams = useSearchParams();
    // const pathName = searchParams.toString();
    // const [successCode, setSuccessCode] = useState(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true);
    //         try {
    //             const productInfo = await getProductDetails(pathName);
    //             setSuccessCode(productInfo?.code);
    //             if (productInfo?.message === "Product Found Other Outlet") {
    //                 setOutletInfo(productInfo?.results?.outlets);
    //             }
    //             if (
    //                 productInfo?.results &&
    //                 productInfo.message != "Product Found Other Outlet"
    //             ) {
    //                 const productDetails = productInfo.results;
    //                 const {
    //                     id,
    //                     product_name,
    //                     price,
    //                     product_thumbnail,
    //                     outlet_id,
    //                     category,
    //                     variations,
    //                     max_quantity,
    //                 } = productDetails;

    //                 const productInfoRecentView = {
    //                     product_id: id,
    //                     outlet_id: outlet_id,
    //                     category_id: category[0]?.id,
    //                 };
    //                 if (session) {
    //                     await recentViewProductApi(
    //                         productInfoRecentView,
    //                         session?.accessToken
    //                     );
    //                 }

    //                 storeProductId(id);

    //                 setProductInfo(productDetails);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching product details:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [pathName, session]);

    return (
        <>
            <section className="product-details-section">
                <div className="container">
                    {/* Breadcrumb always visible */}
                    <Breadcrumb category={productInfo?.category} />
                    {productInfo?.id ? (
                        <>
                            <div className="row product-details-info">
                                <ProductLeftSide
                                    productInfo={productInfo}
                                    // path_name={pathName}
                                />

                                <ProductRightSide productInfo={productInfo} />
                            </div>
                            <div className="pt-5">
                                <RecentViewProduc />
                            </div>
                            <Service />
                        </>
                    ) : (
                        <NoDataFound />
                    )}

                    {/* Show outlet info if available */}
                    {outletInfo?.length > 0 && (
                        <div>
                            <h5>
                                This product is not available in your location
                            </h5>
                            <h6>Available locations:</h6>
                            <ul>
                                {outletInfo.map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductSinglePage;
