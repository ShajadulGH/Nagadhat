"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { FaHeadset, FaListUl, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import CategoryHoverMenu from "./CategoryHoverMenu";

const MobileButtonNav = () => {
    const { data: session } = useSession();
    const [isCategoryHoverMenu, setCategoryHoverMenu] = useState(false);

    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );

    return (
        <div className="position-fixed bottom-0 z-3 w-100">
            <div
                className="d-xl-none bg-white w-100"
                style={{
                    boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.15)",
                }}
            >
                <div className="d-flex justify-content-around align-items-center">
                    <div className="">
                        <Link href="/" className="d-block text-center pb-2 pt-2">
                            <FaShoppingBag />
                            <span className="d-block fs-10 fw-600">Home</span>
                        </Link>
                    </div>
                    <div className="">
                        <div
                            onMouseEnter={()=>setCategoryHoverMenu(true)}
                            className="d-block text-center pb-2 pt-2"
                        >
                            <i className="las la-list-ul fs-20"></i>
                            <FaListUl />
                            <span className="d-block fs-10 fw-600">Category</span>
                        </div>
                    </div>

                    <div className="">
                        <Link
                            href="/cart-page"
                            id="cart-elements-design-mobile"
                            type="button"
                            className="d-block pb-2 pt-2 text-center"
                        //   onClick={showCartInHeader}
                        >
                            <FaShoppingCart />
                            <span className="d-block fs-10 fw-600">
                                Cart (
                                <span className="cart-count" id="totoal-cart-elements-number-mobile">
                                    {addToCartProductLength}
                                </span>
                                )
                            </span>
                        </Link>
                    </div>

                    <div className="">
                        <Link href="/support" className="d-block text-center pb-2 pt-2">
                            <span className="d-inline-block position-relative px-2">
                                <FaHeadset />
                            </span>
                            <span className="d-block fs-10 fw-600">Support</span>
                        </Link>
                    </div>
                    {session ? (
                        <Link href="/dashboard" className="d-block text-center pb-2 pt-2 mobile-side-nav-thumb">
                            <span className="d-block mx-auto">
                                <FaUser />
                            </span>
                            <span className="d-block fs-10 fw-600">Dashboard</span>
                        </Link>
                    ) : (
                        <div className="">
                            <Link href="/login" className="d-block text-center pb-2 pt-2 mobile-side-nav-thumb">
                                <span className="d-block mx-auto">
                                    <FaUser />
                                </span>
                                <span className="d-block fs-10 fw-600">Login</span>
                            </Link>
                        </div>
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
