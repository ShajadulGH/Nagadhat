"use client";
import { useState } from "react";
import CategoryVariantItems from "./CategoryVariantItems";
import ViewMoreLink from "./ViewMoreLink";

const CategoryVariant = ({
    variantData,
    mergeId,
    countItem = true,
    type,
    searchParams,
}) => {
    // const [startIndex, setStartIndex] = useState(0);
    // const itemsPerPage = countItem ? 7 : 5;

    // const handleViewMore = () => {
    //     setStartIndex(startIndex + itemsPerPage);
    // };

    return (
        <div className="product-brand-category-area sub-category-pb40 your-scroll-container" style={{maxHeight: "400px"}}>
            <div className="product-brand-category-list">
                {variantData
                    // .slice(startIndex, startIndex + itemsPerPage)
                    .map((brandItem) => (
                        <CategoryVariantItems
                            key={brandItem.id}
                            brandItem={brandItem}
                            mergeId={mergeId}
                            type={type}
                            searchParams={searchParams}
                        />
                    ))}
                {/* {startIndex + itemsPerPage < variantData.length && (
                    <ViewMoreLink handleViewMore={handleViewMore} />
                )} */}
            </div>
        </div>
    );
};

export default CategoryVariant;
