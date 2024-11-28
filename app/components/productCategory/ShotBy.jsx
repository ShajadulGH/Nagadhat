"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ShotBy = ({ searchParams, categoryByProduct }) => {
    const { id } = categoryByProduct;
    const router = useRouter();
    const [orderValue, setOrderValue] = useState(
        searchParams?.order || "Best Match"
    );
    
    const handleChange = (e) => {
        const order = e.target.value;
        updateURL(order);
    };
    const updateURL = (order) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        if (order === "Best Match") {
            params.delete("order");
        } else {
            params.set("order", order);
        }
        params.set("page", "1");
        url.search = params.toString();
        router.push(url.toString(), undefined, { shallow: true });
        setOrderValue(order);    
    };

    return (
        <div className="all-category-item">
            <div className="category-shot-area d-flex align-items-center">
                <p className=" text-capitalize">Shot By</p>
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
        </div>
    );
};

export default ShotBy;
