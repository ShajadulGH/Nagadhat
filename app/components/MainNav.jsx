"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { getHomeSearchProduct } from "../services/getHomeSearchProduct";
import ProductSearchResult from "./ProductSearchResult";
import ProductSearchResultMobile from "./ProductSearchResultMobile";

import { useSelector } from "react-redux";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CgMenuGridR } from "react-icons/cg";
function MainNav({ isObserverMenuVisible, setCategoryHoverMenu, authStatus }) {
    const [search, setSearch] = useState("");
    const [location, setLoction] = useState("Dhaka, Dhaka");
    const [searchProduct, setSearchProduct] = useState([]);
    const [searchMessage, setSearchMessage] = useState("");
    // const searchParams = useSearchParams();
    // let divisionId = searchParams.get("divisionId");
    // let districtId = searchParams.get("districtId");
    const searchResultRef = useRef(null);
    const addToCartProductLength = useSelector(
        (state) => state.cart?.addToCartLength
    );
    console.log("addToCartProductLength", addToCartProductLength);

    const [districtId, setDistrictId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("districtId") || 47;
        }
        return 47;
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search?.length >= 3) {
            setSearchMessage("Searching...");
            setSearchProduct([]);

            const fetchSearchProduct = async () => {
                try {
                    const productData = await getHomeSearchProduct(
                        districtId,
                        search
                    );
                    if (productData?.code == 200) {
                        const searchResults = productData?.results;
                        setSearchProduct(searchResults);
                        setSearchMessage("");
                    } else {
                        setSearchProduct([]);
                        setSearchMessage(productData?.message);
                    }
                } catch (error) {
                    console.error("Error fetching search products:", error);
                    setSearchProduct([]);
                    setSearchMessage(
                        "An error occurred while fetching products."
                    );
                }
            };

            const Debouncing = setTimeout(() => {
                fetchSearchProduct();
            }, 600);

            return () => {
                clearTimeout(Debouncing);
            };
        } else {
            setSearchMessage("Type at least 3 characters to search.");
            setSearchProduct([]);
        }
    }, [search, districtId]);

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
                setSearch("");
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
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="input-group align-items-center">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="search"
                                            value={search}
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
                            {search && (
                                <ProductSearchResult
                                    searchProduct={searchProduct}
                                    clearSearch={clearSearch}
                                    searchMessage={searchMessage}
                                />
                            )}
                        </div>
                        <div className="header-auth-area d-flex justify-content-end">
                            <ul className="d-flex align-items-center">
                                <li>
                                    <Link
                                        href="/cart-page"
                                        className="text-white text-capitalize position-relative"
                                    >
                                        <span className="d-flex align-items-center m-0">
                                            <AiOutlineShopping
                                                style={{
                                                    height: "34px",
                                                    width: "34px",
                                                }}
                                            />
                                        </span>
                                        {addToCartProductLength ? (
                                            <p
                                                className="rounded-circle position-absolute d-flex align-items-center justify-content-center"
                                                style={{
                                                    minHeight: "22px",
                                                    minWidth: "22px",
                                                    top: "-5%",
                                                    left: "70%",
                                                    aspectRatio: "1 / 1",
                                                    color: "black",
                                                    fontWeight: 700,
                                                    backgroundColor: "#fff",
                                                }}
                                            >
                                                <small className="text-center">
                                                    {addToCartProductLength}
                                                </small>
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </Link>
                                </li>
                                {authStatus === "authenticated" && (
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="text-white text-capitalize d-flex align-items-center"
                                        >
                                            <CgProfile
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                    marginTop: "3px",
                                                }}
                                            />
                                        </Link>
                                    </li>
                                )}

                                {authStatus === "unauthenticated" && (
                                    <li
                                        role="button"
                                        tabIndex="0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#loginModal"
                                        className="login-register-btn text-white d-flex align-items-center text-md mt-1"
                                    >
                                        <CgProfile
                                            style={{
                                                height: "24px",
                                                width: "24px",
                                                marginRight: "5px",
                                                marginLeft: "15px",
                                            }}
                                        />
                                        Login | Register
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
                                    <div className="d-flex gap-2 align-items-center text-white text-capitalize fs-5 fw-semibold">
                                        <span>Categories</span>

                                        <CgMenuGridR
                                            style={{
                                                height: "25px",
                                                width: "25px",
                                            }}
                                        />
                                    </div>
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
                                                    value={search}
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
                                    {search && (
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
                                <li>
                                    <Link
                                        href="/cart-page"
                                        className="text-white text-capitalize position-relative"
                                    >
                                        <span className="d-flex align-items-center m-0">
                                            <AiOutlineShopping
                                                style={{
                                                    height: "34px",
                                                    width: "34px",
                                                }}
                                            />
                                        </span>
                                        {addToCartProductLength ? (
                                            <p
                                                className="rounded-circle position-absolute d-flex align-items-center justify-content-center"
                                                style={{
                                                    minHeight: "22px",
                                                    minWidth: "22px",
                                                    top: "-5%",
                                                    left: "70%",
                                                    aspectRatio: "1 / 1",
                                                    color: "black",
                                                    fontWeight: 700,
                                                    backgroundColor: "#fff",
                                                }}
                                            >
                                                <small className="text-center">
                                                    {addToCartProductLength}
                                                </small>
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </Link>
                                </li>
                                {authStatus === "authenticated" && (
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="d-flex align-items-center"
                                        >
                                            <CgProfile
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                    marginTop: "3px",
                                                    color: "white",
                                                }}
                                            />
                                        </Link>
                                    </li>
                                )}
                                {authStatus === "unauthenticated" && (
                                    <li
                                        role="button"
                                        tabIndex="0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#loginModal"
                                        className="login-register-btn text-white d-flex align-items-center text-md  mt-1"
                                    >
                                        <CgProfile
                                            style={{
                                                height: "24px",
                                                width: "24px",
                                                marginRight: "5px",
                                                marginLeft: "15px",
                                            }}
                                        />
                                        Login | Register
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
