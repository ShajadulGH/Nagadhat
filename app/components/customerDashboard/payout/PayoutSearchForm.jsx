"use client";
import { FaSearch } from "react-icons/fa";

const PayoutSearchForm = ({ searchTerm, setSearchTerm }) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className=" pt-3 pe-3">
                <div className=" d-flex justify-content-end">
                    <div
                        className="input-group affiliate-products-search"
                        style={{ maxWidth: "250px" }}
                    >
                        <input
                            className="form-control"
                            placeholder="Search..."
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            name="search"
                        />
                        <button className="input-group-text" id="search">
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayoutSearchForm;
