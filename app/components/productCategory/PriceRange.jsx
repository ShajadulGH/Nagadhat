"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
const PriceRange = ({
    categoryByMinPrice,
    categoryByMaxPrice,
    categoryTotalMinPrice,
    categoryTotalMaxPrice,
    searchParams,
}) => {
    const router = useRouter();
    const [value, setValue] = useState([
        searchParams?.min_price || categoryByMinPrice,
        searchParams?.max_price || categoryByMaxPrice,
    ]);

    const handleInputChange = (value) => {
        setValue(value);
        const [min, max] = value;
        const bouncing = setTimeout(() => {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);

            params.set("min_price", min);
            params.set("max_price", max);
            params.set("page", "1");
            url.search = params.toString();
            router.push(url.toString(), undefined, { shallow: true });
        }, 100);
        return () => {
            clearTimeout(bouncing);
        };
    };
    return (
        <>
            <div className="product-category-range-area sub-category-pb40">
                <RangeSlider
                    min={parseInt(categoryTotalMinPrice)}
                    max={parseInt(categoryTotalMaxPrice)}
                    value={value}
                    onInput={handleInputChange}
                    rangeSlideDisabled
                />
                <div className="product-category-rang-info d-flex align-items-center justify-content-between">
                    <div className="product-category-rang-value">
                        ৳ {value[0]}
                    </div>
                    <div className="product-category-rang-value">
                        ৳ {value[1]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceRange;
