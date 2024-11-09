"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaCartShopping, FaUser, FaXmark } from "react-icons/fa6";
import CustomerLeftSideNavbar from "./customerDashboard/CustomerLeftSideNavbar";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getHomeSearchProduct } from "../services/getHomeSearchProduct";
import ProductSearchResult from "./ProductSearchResult";
import { useSelector } from "react-redux";

const MobileNav = () => {
    const [popupSearch, setPopupSearch] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchProduct, setSearchProduct] = useState([]);

    const searchAreaRef = useRef(null);
    const searchResultRef = useRef(null);
    const sidebarRef = useRef(null); // Create ref for the sidebar
    const { data: session } = useSession();
    const router = useRouter();

    // const searchParams = useSearchParams();
    // let districtId = searchParams.get("districtId");
    const [districtId, setDistrictId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("districtId") || 47;
        }
        return 47;
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             (searchAreaRef.current &&
    //                 !searchAreaRef.current.contains(event.target)) ||
    //             (searchResultRef.current &&
    //                 !searchResultRef.current.contains(event.target))
    //         ) {
    //             setPopupSearch(false);
    //             setSearchProduct([]);
    //         }

    //         if (
    //             sidebarRef.current &&
    //             !sidebarRef.current.contains(event.target)
    //         ) {
    //             setIsSidebarOpen(false); // Close sidebar when clicking outside
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search?.length >= 3) {
            setSearchProduct([]);

            const fetchSearchProduct = async () => {
                const productData = await getHomeSearchProduct(
                    districtId,
                    search
                );
                const searchResults = productData?.results?.just_for_you;

                if (searchResults) {
                    setSearchProduct(searchResults);
                }
            };
            const Debouncing = setTimeout(() => {
                fetchSearchProduct();
            }, 600);

            return () => {
                clearTimeout(Debouncing);
            };
        }
    }, [search, districtId]);

    const isSearchProductAvailable = () => {
        return searchProduct.length !== 0;
    };
    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div className="row mobile-nav-row-area">
            <div className="col-md-12">
                <div className="mobile-nav-col-area">
                    <div className="mobile-nav-holder d-flex align-items-center justify-content-between">
                        <div className="mobile-nav-item">
                            <div className="mobile-logo">
                                <Link href="/">
                                    <Image
                                        src="/images/logo.svg"
                                        alt="logo"
                                        fill={true}
                                        aria-label="Navigate to homepage"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="mobile-nav-item mobile-nav-item-search gap-2 gap-md-3 d-flex align-items-center">
                            <div
                                className="mobile-nav-location-img"
                                data-bs-toggle="modal"
                                data-bs-target="#district-Modal"
                                aria-label="Change location"
                            >
                                <Image
                                    src="/images/location-footer.svg"
                                    alt="location img"
                                    width={22}
                                    height={21}
                                />
                            </div>
                            <div
                                className="mobile-nav-search-img"
                                onClick={() => setPopupSearch(true)}
                                aria-label="Open search field"
                            >
                                <Image
                                    src="/images/search-icon.svg"
                                    alt="search img"
                                    width={22}
                                    height={21}
                                />
                            </div>
                            <div
                                className="fs-4 text-white dashboard-side-navbar-togol"
                                onClick={() => router.push("/cart-page")}
                                aria-label="Go to cart page"
                            >
                                <FaCartShopping />
                                <sup className="bg-warning rounded-circle px-1 fs-6">{addToCartProductLength}</sup>
                            </div>
                            {session ? (
                                <div
                                    className="fs-4 text-white dashboard-side-navbar-togol"
                                    onClick={toggleSidebar}
                                    aria-label="Open sidebar menu"
                                >
                                    <FaBars />
                                </div>
                            ) : (
                                <div
                                    className="fs-6 text-white dashboard-side-navbar-togol"
                                    onClick={() => router.push("/login")}
                                    aria-label="Go to login page"
                                >
                                    <FaUser />
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`mobile-popup-search-area ${
                            popupSearch ? "active" : ""
                        }`}
                        ref={searchAreaRef}
                    >
                        <form action="#">
                            <div className="mobile-popup-search-item">
                                <input
                                    type="text"
                                    placeholder="Search in Nagadhat..."
                                    className="form-control"
                                    aria-label="Search in Nagadhat"
                                    onChange={handleSearchChange}
                                />
                                <div className="mobile-popup-search-back-arrow">
                                    <div
                                        className="mobile-popup-search-back"
                                        onClick={() => setPopupSearch(false)}
                                        aria-label="Close search field"
                                    >
                                        <Image
                                            src="/images/left-arrow-back.png"
                                            alt="left arrow"
                                            fill={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {search && isSearchProductAvailable() && (
                        <div>
                            <ProductSearchResult
                                searchProduct={searchProduct}
                                clearSearch={clearSearch}
                            />
                        </div>
                    )}
                    <aside
                        className={`customer-dashboard-side-navbar-mobile d-xl-none left-100 ${
                            isSidebarOpen ? "start-0" : "left-100"
                        } `}
                        ref={sidebarRef} // Sidebar ref
                    >
                        <div
                            className="fs-2 dashboard-side-navbar-togol-mobile"
                            onClick={toggleSidebar}
                        >
                            <FaXmark />
                        </div>
                        <CustomerLeftSideNavbar
                            authSessionData={session}
                            toggleSidebar={toggleSidebar}
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
