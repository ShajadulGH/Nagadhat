import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import Link from "next/link";

const AffiliateProductsLinkListPage = () => {
    return (
        <>
            <div className="customer-setting">
                <div className="customer-setting-header">
                    <div className="customer-dashboard-order-history-title border-0 p-0">
                        <h1 className="customer-dashboard-title">
                            Affiliate Products
                        </h1>
                    </div>
                </div>
                <div className="customer-setting-header tab-header border-0">
                    <ul
                        className="nav nav-pills tab-continer"
                        id="myTab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className="nav-link active rounded-0"
                                id="retails-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#retails"
                                type="button"
                                role="tab"
                            >
                                Retails
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link rounded-0 border-start-0 border-end-0"
                                id="container-booking-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#container-booking"
                                type="button"
                                role="tab"
                            >
                                Container Booking
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link rounded-0"
                                id="resale-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#resale"
                                type="button"
                                role="tab"
                            >
                                FPNH (Resale)
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link rounded-0"
                                id="resale-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#properties"
                                type="button"
                                role="tab"
                            >
                                Properties
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content container-booking-body">
                    {/* <!-- retails Content --> */}

                    {/* <!-- container-booking Content --> */}
                    <div
                        className="tab-pane fade"
                        id="container-booking"
                        role="tabpanel"
                    ></div>
                    {/* <!-- retails Content --> */}
                    <div
                        className="tab-pane fade container-booking-body-tab"
                        id="resale"
                        role="tabpanel"
                    >
                        <div className="justify-content-end d-flex align-items-end flex-sm-nowrap flex-wrap gap-2 gap-md-3 pb-4">
                            <div>
                                <label
                                    htmlFor="sort-ascending"
                                    className="form-label"
                                >
                                    Sort By Duration
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="sort-ascending"
                                    id="sort-ascending"
                                >
                                    <option
                                        className="selected"
                                        value="all"
                                    >
                                        Select
                                    </option>
                                    <option value="ascending">
                                        Ascending
                                    </option>
                                    <option value="descending">
                                        Descending
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="sort-pric"
                                    className="form-label"
                                >
                                    Sort By Price
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="sort-pric"
                                    id="sort-pric"
                                >
                                    <option
                                        className="selected"
                                        value="all"
                                    >
                                        Select
                                    </option>
                                    <option value="high-to-low">
                                        High to low
                                    </option>
                                    <option value="low-to-high">
                                        Low to high
                                    </option>
                                </select>
                            </div>
                            <div className="btn-group grid-list-toggol-btn-group">
                                <Link
                                    href="/affiliateproductslink"
                                    className="btn grid-list-toggol-btn"
                                >
                                    <FaTableCells />
                                </Link>
                                <Link
                                    href="/affiliateproductslinklist"
                                    className="btn active-btn grid-list-toggol-btn"
                                >
                                    <FaList />
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div
                                className="d-flex flex-column gap-3"
                                style={{ minWidth: "500px" }}
                            >
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-4 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img1.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳685,00</strong>
                                            <p className="product-discount-price pt-1">
                                                ৳<del>400.00</del>
                                            </p>
                                        </div>
                                        <div className="add-to-cart-btn  add-to-cart-btn-w  ">
                                            <a
                                                className="add-to-cart-link"
                                                href="#"
                                            >
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-4 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img2.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳685,00</strong>
                                            <p className="product-discount-price pt-1">
                                                ৳<del>400.00</del>
                                            </p>
                                        </div>
                                        <div className="add-to-cart-btn  add-to-cart-btn-w ">
                                            <a
                                                className="add-to-cart-link"
                                                href="#"
                                            >
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-4 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img3.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳685,00</strong>
                                            <p className="product-discount-price pt-1">
                                                ৳<del>400.00</del>
                                            </p>
                                        </div>
                                        <div className="add-to-cart-btn  add-to-cart-btn-w ">
                                            <a
                                                className="add-to-cart-link"
                                                href="#"
                                            >
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-4 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img4.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳685,00</strong>
                                            <p className="product-discount-price pt-1">
                                                ৳<del>400.00</del>
                                            </p>
                                        </div>
                                        <div className="add-to-cart-btn  add-to-cart-btn-w ">
                                            <a
                                                className="add-to-cart-link"
                                                href="#"
                                            >
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-4 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img5.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳685,00</strong>
                                            <p className="product-discount-price pt-1">
                                                ৳<del>400.00</del>
                                            </p>
                                        </div>
                                        <div className="add-to-cart-btn  add-to-cart-btn-w ">
                                            <a
                                                className="add-to-cart-link"
                                                href="#"
                                            >
                                                ADD TO CART
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- properties Content --> */}
                    <div
                        className="tab-pane fade container-booking-body-tab"
                        id="properties"
                        role="tabpanel"
                    >
                        <div className="justify-content-end d-flex align-content-end flex-sm-nowrap flex-wrap gap-2 gap-md-3 pb-4">
                            <div className="input-group affiliate-products-search">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                />
                                <button
                                    className="input-group-text"
                                    id="search"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div>
                                <label
                                    htmlFor="show"
                                    className="form-label"
                                    hidden
                                >
                                    Show
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="show"
                                    id="show"
                                >
                                    <option
                                        className="selected"
                                        value="all"
                                    >
                                        Select Category
                                    </option>
                                    <option value="organic">Organic</option>
                                    <option value="mens-fashion">
                                        Men's Fashion
                                    </option>
                                    <option value="women-fashion">
                                        Women's Fashion
                                    </option>
                                    <option value="panjabi">Panjabi</option>
                                    <option value="electronics">
                                        Electronics
                                    </option>
                                    <option value="safety-products">
                                        Safety Products
                                    </option>
                                    <option value="groceries">
                                        Groceries
                                    </option>
                                    <option value="cosmetics">
                                        Cosmetics
                                    </option>
                                    <option value="home-appliances">
                                        Home Appliances
                                    </option>
                                    <option value="stationery">
                                        Stationery
                                    </option>
                                    <option value="covid-19">
                                        Covid 19
                                    </option>
                                </select>
                            </div>
                            <div className="btn-group grid-list-toggol-btn-group">
                                <Link
                                    href="/affiliateproductslink"
                                    className="btn grid-list-toggol-btn"
                                    aria-current="page"
                                >
                                    <FaTableCells />
                                </Link>
                                <Link
                                    href="/affiliateproductslinklist"
                                    className="btn active-btn grid-list-toggol-btn"
                                >
                                    <FaList />
                                </Link>
                            </div>
                        </div>
                        <div className="table-responsive-xl">
                            <div
                                className="d-flex flex-column gap-3 "
                                style={{ minWidth: "500px" }}
                            >
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img1.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img2.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img3.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img4.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img5.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item">
                                    <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                        <div className="d-flex gap-3">
                                            <div
                                                className="mb-0"
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                }}
                                            >
                                                <img
                                                    src="/images/flash-img6.jpg"
                                                    className="img-fluid h-100"
                                                    alt="flash sale image"
                                                />
                                            </div>
                                            <h4>
                                                <a href="#">
                                                    Maggi Masala 620gm
                                                    (8Pcs) Free 2 pcs
                                                    (Nestle)
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <strong>৳ 685,00</strong>
                                            <p className="affiliate-commission">
                                                Commission: ৳10
                                                <span>(5%)</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button className="copy-link-btn mt-0 px-3">
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateProductsLinkListPage;
