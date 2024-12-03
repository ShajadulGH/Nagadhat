"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCategoryMobile } from "../services/getCategoryMobile";
import { NagadhatPublicUrl } from "../utils";
import { getProductByCategory } from "../services/getProductByCategory";
import CategoryProductArchiveItems from "../components/productCategory/CategoryProductArchiveItems";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MobileCategory = () => {
    const [categoryMenuOption, setCategoryMenuOption] = useState([]);
    const [categoryChild, setCategoryChild] = useState([]);
    const [categoryPrduct, setCategoryPrduct] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const sidebarRef = useRef(null); // Create ref for the sidebar
    const [outletId, setOutletId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
        return 3;
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            event.stopPropagation();
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setShowCategory(false); // Close sidebar when clicking outside
                event.stopPropagation();
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategoryMobile();
                setCategoryMenuOption(data || []);
                // await getProductInThisCategory(data[0]?.slug);
            } catch (error) {
                console.error("Failed to fetch category:", error);
            }
        }
        fetchData();
    }, []);

    const getProductInThisCategory = async (slug) => {
        try {
            const productList = await getProductByCategory(outletId, slug);
            setCategoryPrduct(productList?.results?.products || []);
        } catch (error) {
            console.error("Failed to fetch products in this category:", error);
        }
    }

    const handleCategoryClick = (categories) => {
        if (categories?.child_categories?.length > 0) {
            setCategoryChild(categories?.child_categories || []);
            setCategoryPrduct([]);
        } else {
            setCategoryChild([]);
            getProductInThisCategory(categories?.slug);
        }
        setShowCategory(false);
    };
    const handleCategoryChildClick = (childCategories, childCategorieItem) => {
        setCategoryMenuOption(childCategories || []);
        if (childCategorieItem?.child_categories?.length > 0) {
            setCategoryChild(childCategorieItem?.child_categories || []);
            setCategoryPrduct([]);
        } else {
            setCategoryChild([]);
            getProductInThisCategory(childCategorieItem?.slug);
        }
        setShowCategory(false);
    };


    return (
        <div className="container">
            {categoryPrduct?.length > 0 &&
                <div
                    className={`position-absolute top-50 z-3 start-0 fs-1`}
                    onClick={() => setShowCategory(!showCategory)}
                >
                    {showCategory ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </div>
            }
            <div className="d-flex gap-2 position-relative">
                {/* Category Menu */}
                <div
                    className={`w-50 position-relative 
                        ${categoryPrduct?.length > 0 ? `catagory-side-navbar-mobile mobile-category-shadow` : ""} 
                        ${categoryPrduct?.length > 0 && showCategory ? "start-0" : ""}
                    `}
                    style={{ maxWidth: "350px" }}
                    ref={sidebarRef} // Sidebar ref
                    onClick={(e) => e.stopPropagation()} 
                >
                    <ul
                        className="category-menu-area shadow-sm overflow-y-scroll"
                        style={{ height: "calc(100vh - 140px)" }}
                    >
                        {Array.isArray(categoryMenuOption) &&
                            categoryMenuOption.map((menuItem) => (
                                <li
                                    key={menuItem.id}
                                    className="menu-link"
                                    onClick={() => handleCategoryClick(menuItem)}
                                >
                                    <div className="link-item d-flex align-items-center justify-content-between">
                                        <p className="d-flex align-items-center">
                                            <span>
                                                <Image
                                                    width={23}
                                                    height={20}
                                                    src={`${NagadhatPublicUrl}/${menuItem.logo}`}
                                                    alt={menuItem.title || ""}
                                                />
                                            </span>
                                            {menuItem.title}
                                        </p>
                                        {menuItem.child_categories?.length > 0 && (
                                            <small>
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    src="/images/menu-arrow.svg"
                                                    alt="arrow icon"
                                                />
                                            </small>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Subcategory Menu */}
                {
                    categoryPrduct?.length > 0 ? (
                        <div
                            className=" py-4 overflow-y-scroll overflow-x-hidden w-100"
                            style={{ height: "calc(100vh - 140px)" }}
                        >
                            <div className="product-category-grid-area">
                                {categoryPrduct?.map((product) => (
                                    <CategoryProductArchiveItems
                                        key={product.id}
                                        productItem={product}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-100" style={{ maxWidth: "450px" }}>
                            <div
                                className="category-menu-area shadow-sm overflow-y-scroll overflow-x-hidden"
                                style={{ height: "calc(100vh - 150px)" }}
                            >
                                <div className="row">
                                    {categoryChild?.map((subMenuItem) => (
                                        <div
                                            key={subMenuItem.id}
                                            className="menu-link border p-1 col-6"
                                            onClick={() => handleCategoryChildClick(categoryChild, subMenuItem)}
                                        >
                                            <div className="d-flex gap-2 flex-column align-items-center">
                                                <div className="">
                                                    <span>
                                                        <Image
                                                            width={60}
                                                            height={60}
                                                            src={`${NagadhatPublicUrl}/${subMenuItem?.logo}`}
                                                            alt={subMenuItem?.title}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p>{subMenuItem?.title}</p>
                                                    {/* {subMenuItem?.child_categories?.length > 0 && (
                                                        <small>
                                                            <Image
                                                                width={32}
                                                                height={32}
                                                                src="/images/menu-arrow.svg"
                                                                alt="arrow icon"
                                                            />
                                                        </small>
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default MobileCategory;
