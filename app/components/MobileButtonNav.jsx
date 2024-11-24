"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { FaHeadset, FaListUl, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import CategoryHoverMenu from "./CategoryHoverMenu";
import { usePathname } from "next/navigation";

const MobileButtonNav = () => {
    const { data: session } = useSession();
    const [isCategoryHoverMenu, setCategoryHoverMenu] = useState(false);
    const currentPath = usePathname();

    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );

    // Function to determine if a nav link is active
    const isActive = (path) => currentPath === path;

    return (
        <div className="position-fixed bottom-0 z-3 w-100">
            <div
                className="d-xl-none bg-white w-100"
                style={{
                    boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.15)",
                }}
            >
                <div className="d-flex justify-content-around align-items-center">
                    <div>
                        <Link
                            href="/"
                            className={`d-block text-center pb-2 pt-2 ${isActive("/") ? "active-nav" : ""
                                }`}
                        >
                            <FaShoppingBag />
                            <span className="d-block fs-10 fw-600">Home</span>
                        </Link>
                    </div>
                    <div>
                        <div
                            onClick={() => setCategoryHoverMenu(!isCategoryHoverMenu)}
                            className={`d-block text-center pb-2 pt-2 ${isCategoryHoverMenu ? "active-nav" : ""
                                }`}
                        >
                            <FaListUl />
                            <span className="d-block fs-10 fw-600">Category</span>
                        </div>
                    </div>

                    <div>
                        <Link
                            href="/cart-page"
                            className={`d-block text-center pb-2 pt-2 ${isActive("/cart-page") ? "active-nav" : ""
                                }`}
                        >
                            <FaShoppingCart />
                            <span className="d-block fs-10 fw-600">
                                Cart (
                                <span className="cart-count">
                                    {addToCartProductLength}
                                </span>
                                )
                            </span>
                        </Link>
                    </div>

                    <div>
                        <Link
                            href="/support"
                            className={`d-block text-center pb-2 pt-2 ${isActive("/support") ? "active-nav" : ""
                                }`}
                        >
                            <FaHeadset />
                            <span className="d-block fs-10 fw-600">Support</span>
                        </Link>
                    </div>
                    {session ? (
                        <Link
                            href="/dashboard"
                            className={`d-block text-center pb-2 pt-2 ${isActive("/dashboard") ? "active-nav" : ""
                                }`}
                        >
                            <FaUser />
                            <span className="d-block fs-10 fw-600">Dashboard</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className={`d-block text-center pb-2 pt-2 ${isActive("/login") ? "active-nav" : ""
                                }`}
                        >
                            <FaUser />
                            <span className="d-block fs-10 fw-600">Login</span>
                        </Link>
                    )}
                </div>
                <CategoryHoverMenu
                    isActive={isCategoryHoverMenu}
                    setCategoryHoverMenu={setCategoryHoverMenu}
                    isMobile={true}
                />
            </div>
        </div>
    );
};

export default MobileButtonNav;
