"use client";
import { Suspense, useEffect, useState } from "react";
import AffiliateToggleButton from "./AffiliateToggleButton";
import ResaleListViewProductInfo from "./ResaleListViewProductInfo";
import ResaleProductsInfo from "./ResaleProductsInfo";
import { useSession } from "next-auth/react";
import { getAffiliateResaleProduct } from "@/app/services/affiliate/affiliateproducts/getAffiliateResaleProduct";
import Pagination from "@/app/components/productCategory/Pagination";
import { useSearchParams } from "next/navigation";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";
import LodingFixed from "@/app/components/LodingFixed";

const ResaleProducts = ({ isActive }) => {
    const [isGridView, setIsGridView] = useState(true);
    const [resaleProduct, setResaleProduct] = useState([]);
    const [outletId, setOutletId] = useState(0);
    const [sortDuration, setSortDuration] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const [lastPage, setLastPage] = useState(1); // New state for last page
    const [currentPage, setCurrentPage] = useState(1); // New state for current page
    const searchParams = useSearchParams();

    useEffect(() => {
        const page = searchParams.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams, currentPage]);

    const limit = 12; //Per Page Category

    const handleToggle = (view) => {
        setIsGridView(view === "grid");
    };

    const handleSortDurationChange = (event) => {
        setSortDuration(event.target.value);
    };

    const handleSortPriceChange = (event) => {
        setSortPrice(event.target.value);
    };

    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken && outletId) {
            const fetchRetailProducts = async () => {
                try {
                    setLoading(true);
                    let params = {
                        orderByPrice: sortPrice,
                        orderByDuration: sortDuration,
                        page: currentPage,
                        limit: limit,
                    };
                    const resaleProductInfo = await getAffiliateResaleProduct(
                        session.accessToken,
                        outletId,
                        params
                    );
                    const resaleProductData =
                        resaleProductInfo?.results
                            ?.affiliate_fast_moving_products;
                    setResaleProduct(resaleProductData);
                    setLastPage(resaleProductData.last_page || 1);
                } catch (error) {
                    console.error("Failed to fetch retail products:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRetailProducts();
        }
    }, [session.accessToken, outletId, sortDuration, sortPrice]);

    return (
        <>
            {loading && <LodingFixed />}
            <div
                className={`tab-pane fade ${isActive ? "show active" : ""
                    } container-booking-body-tab`}
                id="resale"
                role="tabpanel"
            >
                <div className="justify-content-end d-flex align-items-end flex-sm-nowrap flex-wrap gap-2 gap-md-3 pb-4">
                    <div>
                        <label htmlFor="sort-duration" className="form-label">
                            Sort By Duration
                        </label>
                        <select
                            className="form-select district-list"
                            name="sort-duration"
                            id="sort-duration"
                            value={sortDuration}
                            onChange={handleSortDurationChange}
                        >
                            <option className="selected" defaultValue="">
                                Select
                            </option>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sort-price" className="form-label">
                            Sort By Price
                        </label>
                        <select
                            className="form-select district-list"
                            name="sort-price"
                            id="sort-price"
                            value={sortPrice}
                            onChange={handleSortPriceChange}
                        >
                            <option className="selected" defaultValue="">
                                Select
                            </option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    </div>
                    <AffiliateToggleButton
                        handleToggle={handleToggle}
                        isGridView={isGridView}
                    />
                </div>
                <Suspense fallback={<DefaultLoader />}>
                    {
                        resaleProduct.length > 0
                            ?
                            <>
                                {isGridView ? (
                                    <ResaleProductsInfo
                                        resaleProduct={resaleProduct}
                                        outletId={outletId}
                                    />
                                ) : (
                                    <ResaleListViewProductInfo
                                        resaleProduct={resaleProduct}
                                        outletId={outletId}
                                    />
                                )}
                            </>
                            :
                            !loading && <NoDataFound />

                    }

                    <Pagination currentPage={currentPage} lastPage={lastPage} />
                </Suspense>
            </div>
        </>
    );
};

export default ResaleProducts;
