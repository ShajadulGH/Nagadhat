"use client";

import { getHomeCategory } from "@/app/services/getHomeCategory";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PrivilegeCardProductTop = ({
    setCategoryFilter,
    categoryFilter,
    setSearchTerm,
    searchTerm,
}) => {
    const [searchValue, setSearchValue] = useState(searchTerm);
    const [categoryValue, setCategoryValue] = useState([]);

    const searchParam = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchValue.length > 1) {
            const handler = setTimeout(() => {
                setSearchTerm(searchValue);
                const newParams = new URLSearchParams(searchParam);
                newParams.set("page", 1);
                const newUrl = `${
                    window.location.pathname
                }?${newParams.toString()}`;
                router.push(newUrl);
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        } else {
            setSearchTerm("");
        }
    }, [searchValue]);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategoryFilter(value);
        const newParams = new URLSearchParams(searchParam);
        newParams.set("page", 1);
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        router.push(newUrl);
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
        <div className="row pt-4 pb-4 px-3 px-md-4">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-end gap-2">
                    <div>
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search Product"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
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
