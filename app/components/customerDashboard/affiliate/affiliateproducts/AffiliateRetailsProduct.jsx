"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { getAffiliateRetailProduct } from "@/app/services/affiliate/affiliateproducts/getAffiliateRetailProduct";
import { getHomeCategory } from "@/app/services/getHomeCategory";
import AffiliateRetailsProductInfo from "./AffiliateRetailsProductInfo";
import RetailListViewProductInfo from "./RetailListViewProductInfo";
import AffiliateToggleButton from "./AffiliateToggleButton";
import Swal from "sweetalert2";
import Pagination from "@/app/components/productCategory/Pagination";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";

const AffiliateRetailsProduct = ({ isActive }) => {
    const [isPending, startTransition] = useTransition();
    const [isGridView, setIsGridView] = useState(true);
    const [retailProduct, setRetailProduct] = useState([]);
    const [outletId, setOutletId] = useState(0);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [tempSearchProduct, setTempSearchProduct] = useState("");
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const baseUrl = window?.location?.origin;
    let referralLink = baseUrl;
    const [copied, setCopied] = useState(false);
    const [lastPage, setLastPage] = useState(1); // New state for last page
    const [currentPage, setCurrentPage] = useState(1); // New state for current page

    useEffect(() => {
        const page = searchParams.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams]);

    const limit = 12; //Per Page Category

    const handleCopy = () => {
        setCopied(true);

        let timerInterval;
        Swal.fire({
            title: "Referral Link Copied!",
            html: `Closing in <b></b> milliseconds.<br>${referralLink}`,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
            }
        });
    };

    const handleToggle = (view) => {
        setIsGridView(view === "grid");
    };

    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    useEffect(() => {
        const categoryId = searchParams.get("categoryId") || "";
        const searchInfo = searchParams.get("search") || "";
        setSelectedCategory(categoryId);
        setSearchProduct(searchInfo);
        setTempSearchProduct(searchInfo);
    }, [searchParams]);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (selectedCategory) {
            newSearchParams.set("categoryId", selectedCategory);
            newSearchParams.set("page", 1);
        } else {
            newSearchParams.delete("categoryId");
        }
        if (searchProduct) {
            newSearchParams.set("search", searchProduct);
            newSearchParams.set("page", 1);
        } else {
            newSearchParams.delete("search");
        }
        window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }, [selectedCategory, searchProduct]);

    useEffect(() => {
        if (session?.accessToken && outletId) {
            const fetchRetailProducts = async () => {
                try {
                    let params = {
                        page: currentPage,
                    };
                    if (selectedCategory) params.categoryId = selectedCategory;
                    if (searchProduct) params.search = searchProduct;
                    startTransition(async () => {
                        const retailProductInfo =
                            await getAffiliateRetailProduct(
                                session?.accessToken,
                                outletId,
                                params,
                                limit
                            );
                        const retailProductData =
                            retailProductInfo?.results
                                ?.affiliate_retail_products;
                        setRetailProduct(retailProductData?.data);
                        setLastPage(retailProductData?.last_page || 1);
                    });
                } catch (error) {
                    console.error("Failed to fetch retail products:", error);
                }
            };
            fetchRetailProducts();
        }
    }, [
        session?.accessToken,
        outletId,
        selectedCategory,
        searchProduct,
        currentPage,
        limit,
    ]);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchCategories = async () => {
                try {
                    const categoryList = await getHomeCategory();
                    const categoryListData = categoryList?.data || [];
                    setAllCategories(categoryListData);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };

            fetchCategories();
        }
    }, [status]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTempSearchProduct(value);
        if (value.length < 3) {
            setSearchProduct("");
        }
    };

    const handleSearchClick = () => {
        if (tempSearchProduct.length >= 3) {
            setSearchProduct(tempSearchProduct);
            setTempSearchProduct("");
        }
    };

    return (
        <>
            <div
                className={`tab-pane fade ${
                    isActive ? "show active" : ""
                } container-booking-body-tab`}
                id="retails"
                role="tabpanel"
            >
                <div className="justify-content-end d-flex align-content-end flex-sm-nowrap flex-wrap gap-2 gap-md-3 pb-4">
                    <div className="input-group affiliate-products-search">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            name="search"
                            value={tempSearchProduct}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={handleSearchClick}
                            className="input-group-text"
                            id="search"
                        >
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                    <div>
                        <label
                            htmlFor="categoryid"
                            className="form-label"
                            hidden
                        >
                            Show
                        </label>
                        <select
                            className="form-select district-list"
                            name="categoryId"
                            id="categoryid"
                            value={selectedCategory || ""}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            {Array.isArray(allCategories) &&
                            allCategories.length > 0 ? (
                                allCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))
                            ) : (
                                <option disabled>
                                    No categories available
                                </option>
                            )}
                        </select>
                    </div>
                    <AffiliateToggleButton
                        handleToggle={handleToggle}
                        isGridView={isGridView}
                    />
                </div>

                {isPending ? (
                    <DefaultLoader />
                ) : retailProduct?.length > 0 ? (
                    isGridView ? (
                        <AffiliateRetailsProductInfo
                            retailProduct={retailProduct}
                            outletId={outletId}
                            handleCopy={handleCopy}
                            referralLink={referralLink}
                            copied={copied}
                        />
                    ) : (
                        <RetailListViewProductInfo
                            retailProduct={retailProduct}
                            outletId={outletId}
                            handleCopy={handleCopy}
                            referralLink={referralLink}
                            copied={copied}
                        />
                    )
                ) : (
                    <NoDataFound />
                )}

                <div className=" pt-3">
                    <Pagination currentPage={currentPage} lastPage={lastPage} />
                </div>
            </div>
        </>
    );
};

export default AffiliateRetailsProduct;
