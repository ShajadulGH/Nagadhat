"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";


const PayoutSearchForm = ({ searchTerm, setSearchTerm }) => {
    const [debouncedTerm, setDebouncedTerm] = useState('');
    useEffect(() => {
        if (debouncedTerm.length > 3) {
            const handler = setTimeout(() => {
                setSearchTerm(debouncedTerm);
                const newParams = new URLSearchParams(searchParam);
                newParams.set("page", 1);
                const newUrl = `${window.location.pathname}?${newParams.toString()}`;
                router.push(newUrl);
            }, 500); // Delay of 300ms

            return () => {
                clearTimeout(handler); // Cleanup timeout on every re-render
            };
        }
    }, [debouncedTerm]);

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
                            value={debouncedTerm}
                            onChange={(e) => setDebouncedTerm(e.target.value)}
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
