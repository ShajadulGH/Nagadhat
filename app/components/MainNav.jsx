"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import SignoutBtn from "./SignoutBtn";
import { getHomeSearchProduct } from "../services/getHomeSearchProduct";
import ProductSearchResult from "./ProductSearchResult";
import ProductSearchResultMobile from "./ProductSearchResultMobile";
// import { getDivision } from "../services/getDivision";
// import { getDistrictByDivisionId } from "../services/getDistrict";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

function MainNav({
    isObserverMenuVisible,
    isCategoryHoverMenu,
    setCategoryHoverMenu,
    authStatus,
}) {
    const [search, setSearch] = useState("");
    const [location, setLoction] = useState("Dhaka, Dhaka");
    const [searchProduct, setSearchProduct] = useState([]);
    const searchParams = useSearchParams();
    let divisionId = searchParams.get("divisionId");
    let districtId = searchParams.get("districtId");
    const searchResultRef = useRef(null);
    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const fetchSearchProduct = async () => {
            if (!search || search.length < 3) {
                setSearchProduct([]);
                return;
            }

            if (!districtId) {
                districtId = 47;
            }

            const productData = await getHomeSearchProduct(districtId, search);

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
    }, [search, districtId]);

    const isSearchProductAvailable = () => {
        return searchProduct.length !== 0;
    };

    useEffect(() => {
        const location = localStorage.getItem("location");
        setLoction(location ? location : "Dhaka, Dhaka");
    }, [districtId]);

    // Function to handle click outside the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchResultRef.current &&
                !searchResultRef.current.contains(event.target)
            ) {
                setSearchProduct([]);
                setSearch();
            }
        };
        if (typeof window !== "undefined") {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setSearchProduct, setSearch]);

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div ref={searchResultRef}>
            <div
                className={`row main-header-section ${
                    !isObserverMenuVisible ? "" : "d-none"
                }`}
            >
                <div className="col-12">
                    <div className="main-header-area d-flex">
                        <div className="logo">
                            <Link href="/" className="d-inline-block">
                                <Image
                                    width={0}
                                    height={43}
                                    sizes="100vw"
                                    src="/images/logo.svg"
                                    style={{ width: "100%" }}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="header-search-area d-flex align-items-center w-100">
                            <div className="header-search-location">
                                <button
                                    type="button"
                                    className="text-capitalize d-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#district-Modal"
                                >
                                    <Image
                                        src="/images/store-location.svg"
                                        alt="store-location"
                                        width={17}
                                        height={15}
                                    />
                                    {location}
                                </button>
                            </div>
                            <div className="header-search-field">
                                <form action="#">
                                    <div className="input-group align-items-center">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="search"
                                            placeholder="Search in Nagad Hat..."
                                            onChange={handleSearchChange}
                                        />
                                        <button
                                            className="search-icon-btn d-flex align-items-center justify-content-center"
                                            type="button"
                                        >
                                            <Image
                                                src="/images/search-icon.svg"
                                                alt="search-icon"
                                                width={18}
                                                height={18}
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {search && isSearchProductAvailable() && (
                                <ProductSearchResult
                                    searchProduct={searchProduct}
                                    clearSearch={clearSearch}
                                />
                            )}
                        </div>
                        <div className="header-auth-area d-flex justify-content-end">
                            <ul className="d-flex align-items-center">
                                {authStatus === "unauthenticated" && (
                                    <li>
                                        <Link
                                            href="/login"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/login-icon.svg"
                                                alt="login-icon"
                                                width={13}
                                                height={19}
                                            />
                                            Login
                                        </Link>
                                    </li>
                                )}

                                {authStatus === "unauthenticated" && (
                                    <li>
                                        <Link
                                            href="/registration"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/register-icon.svg"
                                                alt="register-icon"
                                                width={14}
                                                height={17}
                                            />
                                            Register
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <Link
                                        href="/cart-page"
                                        className="text-white text-capitalize d-flex align-items-center"
                                    >
                                        <span className="bg-white d-flex align-items-center">
                                            <Image
                                                src="/images/cart-icon.svg"
                                                alt="cart-icon"
                                                width={17}
                                                height={15}
                                            />
                                        </span>
                                        Cart ({addToCartProductLength})
                                    </Link>
                                </li>
                                {authStatus === "authenticated" && (
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <span className="bg-white d-flex align-items-center">
                                                <FaUser
                                                    style={{ color: "#44bc9d" }}
                                                />
                                            </span>
                                            User
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`row observerable-header-section ${
                    isObserverMenuVisible ? "" : "d-none"
                }`}
            >
                <div className="col-12">
                    <div className="main-header-area d-flex">
                        <div className="logo">
                            <Link href="/" className="d-inline-block">
                                <Image
                                    width={0}
                                    height={43}
                                    sizes="100vw"
                                    alt="logo"
                                    src="/images/logo.svg"
                                    style={{ width: "100%" }}
                                />
                            </Link>
                        </div>
                        <div className="header-search-area observerable-header-search-area">
                            <div className="header-search-inner-area d-flex align-items-center">
                                <div
                                    className="observerable-categories-item position-relative"
                                    onMouseEnter={() =>
                                        setCategoryHoverMenu(true)
                                    }
                                    onMouseLeave={() =>
                                        setCategoryHoverMenu(true)
                                    }
                                >
                                    <Link
                                        href="#"
                                        className="d-flex align-items-center text-white text-capitalize"
                                    >
                                        <span>Categories</span>
                                        <Image
                                            className="categories-arrow-img"
                                            src="/images/Categories-arrow.svg"
                                            alt="arrow"
                                            width={10}
                                            height={7}
                                        />
                                    </Link>
                                </div>
                                <div className="header-search-holder d-flex align-items-center">
                                    <div className="header-search-location">
                                        <button
                                            type="button"
                                            className="text-capitalize d-flex align-items-center"
                                            data-bs-toggle="modal"
                                            data-bs-target="#district-Modal"
                                        >
                                            <Image
                                                src="/images/store-location.svg"
                                                alt="store-location"
                                                width={17}
                                                height={15}
                                            />
                                            {location}
                                        </button>
                                    </div>
                                    <div className="header-search-field">
                                        <form action="#">
                                            <div className="input-group align-items-center">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="search"
                                                    placeholder="Search in Nagad Hat..."
                                                    onChange={
                                                        handleSearchChange
                                                    }
                                                />
                                                <button
                                                    className="search-icon-btn d-flex align-items-center justify-content-center"
                                                    type="button"
                                                >
                                                    <Image
                                                        src="/images/search-icon.svg"
                                                        alt="search-icon"
                                                        width={18}
                                                        height={18}
                                                    />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {search && isSearchProductAvailable() && (
                                        <ProductSearchResultMobile
                                            searchProduct={searchProduct}
                                            clearSearch={clearSearch}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="header-auth-area d-flex justify-content-end">
                            <ul className="d-flex align-items-center">
                                {authStatus === "unauthenticated" && (
                                    <li>
                                        <Link
                                            href="/login"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/login-icon.svg"
                                                alt="login-icon"
                                                width={13}
                                                height={19}
                                            />
                                            Login
                                        </Link>
                                    </li>
                                )}

                                {authStatus === "unauthenticated" && (
                                    <li>
                                        <Link
                                            href="/registration"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <Image
                                                src="/images/register-icon.svg"
                                                alt="register-icon"
                                                width={14}
                                                height={17}
                                            />
                                            Register
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <Link
                                        href="/cart-page"
                                        className="text-white text-capitalize d-flex align-items-center"
                                    >
                                        <span className="bg-white d-flex align-items-center">
                                            <Image
                                                src="/images/cart-icon.svg"
                                                alt="cart-icon"
                                                width={17}
                                                height={15}
                                            />
                                        </span>
                                        Cart ({addToCartProductLength})
                                    </Link>
                                </li>

                                {authStatus === "authenticated" && (
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <span className="bg-white d-flex align-items-center">
                                                <FaUser
                                                    style={{ color: "#44bc9d" }}
                                                />
                                            </span>
                                            User
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainNav;
