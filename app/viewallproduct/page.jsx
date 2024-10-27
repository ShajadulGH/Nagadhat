"use client";

import { useEffect, useState } from "react";
import Sales from "../components/Sales";
import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllProduct from "../components/viewAllProduct/ViewAllProduct";
import { getHomeFlashSalesProduct } from "../services/getHomeFlashSalesProduct";
import { getHomeJustForYouProduct } from "../services/getHomeJustForYouProduct";
import { fetchRecentViewProducts } from "../services/getRecentViewProduct";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Pagination from "../components/productCategory/Pagination";
import { getRecentViewProductsById } from "../services/getRecentViewProductsById";
import RecentViewProduc from "../components/RecentViewProduc";

const ViewAllProductPage = () => {
    const [viewProductData, setViewProductData] = useState([]);
    const [recentViewProductData, setRecentViewProductData] = useState([]);
    const [flashSaleEndData, setFlashSaleEndData] = useState(null);
    const [sectionTitle, setSectionTitle] = useState("View All Product");
    const [bannerUrl, setBannerUrl] = useState("/images/fashion.jpg");
    const [districtId, setDistrictId] = useState(null);
    const { status, data: session } = useSession();
    const [outletId, setOutletId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lastPage, setLastPage] = useState(1); 
    const [currentPages, setCurrentPages] = useState(1); 
    const [recentView, setRecentView] = useState(true); 

    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
        const page = searchParams.get('page');
        if (page && page !== currentPages) {
            setCurrentPages(parseInt(page));
        }
    }, [searchParams, currentPages]);
    const limit = 24; //Per Page Category

    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, [session]);

    useEffect(() => {
        const initialDistrictId = localStorage.getItem("districtId");
        setDistrictId(initialDistrictId || 47);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (type && districtId) {
                    switch (type) {
                        case "justForYou":
                            try {
                                setRecentView(true)
                                const justForYouProductData = await getHomeJustForYouProduct(districtId, currentPages, limit);
                                setViewProductData(justForYouProductData?.results?.just_for_you?.data);
                                setLastPage(justForYouProductData?.results?.just_for_you?.last_page)
                                setSectionTitle("Just For You");
                                // recentViewConfigure();
                            } catch (error) {
                                console.error("Error fetching 'Just For You' products:", error);
                            }
                            break;

                        case "flashSale":
                            try {
                                setRecentView(true)
                                const flashSaleProductData =
                                    await getHomeFlashSalesProduct(districtId, currentPages, limit);
                                const flashSaleInfoTime =
                                    flashSaleProductData?.results?.flash_sale_info
                                        ?.end_time;
                                setViewProductData(
                                    flashSaleProductData?.results
                                        ?.flash_sales_product.data
                                );
                                setLastPage(flashSaleProductData?.results
                                    ?.flash_sales_product.last_page)
                                setFlashSaleEndData(flashSaleInfoTime);
                                setSectionTitle("Flash Sale");
                                // recentViewConfigure();
                            } catch (error) {
                                console.error("Error fetching 'Just For You' products:", error);
                            }
                            break;
                        case "recentview":
                            try {
                                setRecentView(false)
                                setViewProductData([]); // Clear existing data
                                setRecentViewProductData([]); // Clear recent view data

                                if (typeof window !== "undefined" && outletId) {
                                    try {
                                        const storedProducts = JSON.parse(localStorage.getItem('recentlyViewProductIds')) || [];

                                        if (storedProducts.length > 0) {
                                            const recentViewProducts = await getRecentViewProductsById(outletId, storedProducts);
                                            if (recentViewProducts.code == 200) {
                                                setViewProductData(recentViewProducts?.results?.product_information
                                                );
                                                setRecentViewProductData(recentViewProducts?.results?.product_information);
                                                setLastPage(1)
                                            } else {
                                                console.warn('No recent view products fetched');
                                            }
                                        }
                                    } catch (error) {
                                        console.error('Error fetching recently viewed products:', error);
                                    }
                                }
                                setSectionTitle("Recent View Product");
                                setRecentViewProductData([]);
                            } catch (error) {
                                console.error("Error fetching 'Just For You' products:", error);
                            }
                            break;
                        default:
                            setViewProductData("No Data");
                            setSectionTitle("View All Product");
                            break;
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally {
                setLoading(false);
            };
        };
        fetchData();
    }, [districtId, type, currentPages]);


    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />

            <ViewAllCategoryTitle
                title={sectionTitle}
                isFlashSaleTimer={true}
                flashSaleEndData={flashSaleEndData}
            />
            
            <ViewAllProduct viewProductData={viewProductData} loading={loading}/>

            <Pagination
                currentPage={currentPages}
                lastPage={lastPage}
            />

            { recentView && (
                <RecentViewProduc/>
            )}

            <Service />
        </div>
    );
};

export default ViewAllProductPage;
