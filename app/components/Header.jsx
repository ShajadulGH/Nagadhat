"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import MiniNav from "./MiniNav";
import MainNav from "./MainNav";
import HeroSlider from "./HeroSlider";
import CategoryHoverMenu from "./CategoryHoverMenu";
import MobileNav from "./MobileNav";
import {
    addToCartProductList,
    apiBaseUrl,
    getTotalQuantity,
    storeUserAgent,
} from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../store/cartSlice";
import { fetchCartProducts } from "../services/getShowAddToCartProduct";

function Header() {
    const path = useParams();
    const { status, data: session } = useSession();
    const [isSticky, setSticky] = useState(false);
    const [isObserverMenuVisible, setObserverMenuVisible] = useState(false);
    const [isCategoryHoverMenu, setCategoryHoverMenu] = useState(false);
    const [isResponsive, setResponsive] = useState(false);
    const [outletId, setOutletId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
        return 3;
    });

    const [districtId, setDistrictId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("districtId") || 47;
        }
        return 47;
    });
    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );

    useEffect(() => {
        const handleScrollPosition = () => {
            let scrollPosition = 5;
            let scrollPositionWidth = 5;
            if (typeof window !== "undefined") {
                scrollPosition = window.scrollY ||5;
                scrollPositionWidth = window.innerWidth ||5;
            }
            scrollPosition >= 0 ? setSticky(true) : setSticky(false);
            scrollPositionWidth < 1200
                ? setResponsive(true)
                : setResponsive(false);
            if (scrollPosition > 450) {
                setObserverMenuVisible(true);
            } else {
                setObserverMenuVisible(false);
                setCategoryHoverMenu(false);
            }
        };
        handleScrollPosition()
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScrollPosition);
            window.addEventListener("resize", handleScrollPosition);
        }
        return () => {
            window.removeEventListener("scroll", handleScrollPosition);
            window.removeEventListener("resize", handleScrollPosition);
        };
    }, []);

    const scrollOption = {
        isObserverMenuVisible,
        isCategoryHoverMenu,
        setCategoryHoverMenu,
    };

    const addToCartProduct = async (cartItems, accessToken) => {
        try {
            if (cartItems.length > 0 && accessToken) {
                const response = await fetch(`${apiBaseUrl}/add-to-cart-product`, {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cart_items: cartItems }),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                return response.json();
            } else {
                console.warn("No items to add or missing access token.");
                return null;
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            return null;
        }
    };
    

    useEffect(() => {
        storeUserAgent();
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        const setCartProductLength = async () => {
            try {
                if (session) {
                    const cartProduct = addToCartProductList();
                    await addToCartProduct(cartProduct, session?.accessToken);
                    const updatedCartProducts = await fetchCartProducts(
                        session?.accessToken,
                        outletId,
                        districtId
                    );
                    localStorage.removeItem("addToCart");

                    if (updatedCartProducts?.success) {
                        const quantityTotal = getTotalQuantity(
                            updatedCartProducts?.data
                        );
                        dispatch(
                            setAddToCart({
                                hasSession: true,
                                length: quantityTotal,
                            })
                        );
                    }
                } else {
                    if (typeof window !== "undefined") {
                        const addToCart = addToCartProductList();
                        const quantityTotal = getTotalQuantity(addToCart);
                        dispatch(
                            setAddToCart({
                                hasSession: false,
                                length: quantityTotal,
                            })
                        );
                    }
                }
            } catch (error) {
                console.error("Error setting cart product length:", error);
            }
        };

        setCartProductLength();
    }, [session?.accessToken, dispatch, outletId, districtId]);

    useEffect(() => {
        storeUserAgent();
    }, []);

    return (
        <>
            <header className={`header-sticky ${isSticky ? "header-sticky" : ""}`}>
                <div className="header-wrapper">
                    <div className="container header-container">
                        {!isObserverMenuVisible && !isResponsive && <MiniNav />}
                        {!isResponsive ? (
                            <MainNav {...scrollOption} authStatus={status} />
                        ) : (
                            <MobileNav />
                        )}
                        {!path && <HeroSlider />}
                    </div>
                </div>
            </header>
            <CategoryHoverMenu
                isActive={isCategoryHoverMenu}
                setCategoryHoverMenu={setCategoryHoverMenu}
            />
        </>
    );
}

export default Header;
