"use client";

import { getHomeCategory } from "@/app/services/getHomeCategory";
import { useEffect, useState } from "react";

const PrivilegeCardProductTop = ({
    setCategoryFilter,
    categoryFilter,
    setSearchTerms,
    searchTerms,
}) => {
    const [searchValue, setSearchValue] = useState(searchTerms);
    const [categoryValue, setCategoryValue] = useState([]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value.length === 0 || value.length >= 3) {
            setSearchTerms(value);
        }
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategoryFilter(value);
    };

    useEffect(() => {
        const fetchgetCategory = async () => {
            try {
                const response = await getHomeCategory();
                setCategoryValue(response?.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchgetCategory();
    }, []);

    return (
        <div className="row pt-4 pb-4 px-4">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-end gap-2">
                    <div>
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search Product"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div>
                        <select
                            className="form-select"
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Choose Categories</option>
                            {categoryValue?.length > 0 ? (
                                categoryValue.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))
                            ) : (
                                <option>No Category Found!!!</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeCardProductTop;
