"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";

const ShotBy = ({ searchParams }) => {
    const router = useRouter();
    const [orderValue, setOrderValue] = useState(
        searchParams?.order || "Best Match"
    );
    const [activeDropdownSort, setActiveDropdownSort] = useState(false);

    const handleChange = (e) => {
        const order = e.target.value;
        updateURL(order);
    };

    const updateURL = (order) => {
        const params = new URLSearchParams(window.location.search);
        if (order === "Best Match") {
            params.delete("order");
        } else {
            params.set("order", order);
        }
        params.set("page", "1");
        router.push(`?${params.toString()}`, undefined, { shallow: true });
        setOrderValue(order);
    };

    const handleDropdownSelect = (order) => {
        setActiveDropdownSort(false);
        updateURL(order);
    };

    const handleOutsideClick = (e) => {
        e.stopPropagation()
        if (!e.target.closest(".dropdown-container")) {
            setActiveDropdownSort(null);
            e.stopPropagation()
        }
    };

    // Add event listener for clicks outside the dropdowns
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="all-category-item">
            {/* Desktop Sorting */}
            <div className="category-shot-area d-lg-flex align-items-center d-none">
                <p className="text-capitalize">Sort By</p>
                <div className="category-shot-option">
                    <select
                        className="form-select"
                        onChange={handleChange}
                        value={orderValue}
                    >
                        <option value="Best Match">Best Match</option>
                        <option value="asc">Low to High Price</option>
                        <option value="desc">High to Low Price</option>
                    </select>
                </div>
            </div>

            {/* Mobile Sorting */}
            <div className="dropdown-container d-block d-lg-none">
                <p onClick={() => setActiveDropdownSort(!activeDropdownSort)}>
                    <FaFilter className="praymary-color" title="Sort By"/>
                </p>
                {activeDropdownSort && (
                    <div className="dropdown-content end-0 fs-6">
                        <ul>
                            <li className="p-1" onClick={() => handleDropdownSelect("Best Match")}>
                                Best Match
                            </li>
                            <li className="p-1" onClick={() => handleDropdownSelect("asc")}>
                                Low to High Price
                            </li>
                            <li className="p-1" onClick={() => handleDropdownSelect("desc")}>
                                High to Low Price
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShotBy;
