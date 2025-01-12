"use client";
import { useEffect, useState } from "react";
import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllProduct from "../components/viewAllProduct/ViewAllProduct";
import { getRecentViewProductsById } from "../services/getRecentViewProductsById";
import  bannerUrl from "@/public/images/banner/Recent View Products-01.webp"

const ViewAllProductPage = () => {
    const [viewProductData, setViewProductData] = useState([]);
    const [outletId, setOutletId] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== "undefined" && outletId) {
                try {
                    const storedProducts = JSON.parse(localStorage.getItem('recentlyViewProductIds')) || [];

                    if (storedProducts.length > 0) {
                        const recentViewProducts = await getRecentViewProductsById(outletId, storedProducts);
                        if (recentViewProducts.code == 200) {
                            setViewProductData(recentViewProducts?.results?.product_information
                            );
                        } else {
                            console.warn('No recent view products fetched');
                        }
                    }
                } catch (error) {
                    console.error('Error fetching recently viewed products:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [outletId]);


    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />

            <ViewAllCategoryTitle
                title="Recent View Product"
            />
            <ViewAllProduct viewProductData={viewProductData} loading={loading} />
            <Service />
        </div>
    );
};

export default ViewAllProductPage;
