import { useEffect, useState } from "react";
import { FaArrowDownShortWide, FaBangladeshiTakaSign, FaList, FaTag } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import SubCategoryList from "./SubCategoryList";
import PriceRange from "./PriceRange";
import CategoryVariant from "./CategoryVariant";
import CategoryColorVariant from "./CategoryColorVariant";

const FiltersCategoryMobile = ({
    categoryByBrand,
    categoryByColor,
    categoryBySize,
    categoryByMinPrice,
    categoryByMaxPrice,
    searchParams,
    allSubCategories,
    categoryTotalMaxPrice,
    categoryTotalMinPrice
}) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleToggle = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleOutsideClick = (e) => {
        e.stopPropagation()
        if (!e.target.closest(".dropdown-container")) {
            setActiveDropdown(null);
            e.stopPropagation()
        }
    };

    // Add event listener for clicks outside the dropdowns
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="">
            <div className="d-flex gap-3 align-items-center">
                {allSubCategories?.length > 0 && (
                    <div className="dropdown-container">
                        <p onClick={() => handleToggle("subCategory")}>
                            <FaList title="Sub Categories" /> Categories
                        </p>
                        {activeDropdown === "subCategory" && (
                            <div className="dropdown-content">
                                <SubCategoryList subCategoryData={allSubCategories} />
                            </div>
                        )}
                    </div>
                )}
                {categoryByMinPrice && categoryByMaxPrice && (
                    <div className="dropdown-container">
                        <p onClick={() => handleToggle("priceRange")}>
                            <FaBangladeshiTakaSign title={`Price Range`} /> Price
                        </p>
                        {activeDropdown === "priceRange" && (
                            <div className="dropdown-content">
                                <PriceRange
                                    categoryByMinPrice={categoryByMinPrice}
                                    categoryByMaxPrice={categoryByMaxPrice}
                                    categoryTotalMinPrice={categoryTotalMinPrice}
                                    categoryTotalMaxPrice={categoryTotalMaxPrice}
                                    searchParams={searchParams}
                                />
                            </div>
                        )}
                    </div>
                )}
                {categoryByBrand?.length > 0 && (
                    <div className="dropdown-container">
                        <p onClick={() => handleToggle("brand")}>
                            <FaTag title={`Brand`} /> Brand
                        </p>
                        {activeDropdown === "brand" && (
                            <div className="dropdown-content">
                                <CategoryVariant
                                    variantData={categoryByBrand}
                                    type="brand"
                                    searchParams={searchParams}
                                />
                            </div>
                        )}
                    </div>
                )}
                {categoryByColor?.length > 0 && (
                    <div className="dropdown-container">
                        <p onClick={() => handleToggle("color")}>
                            <IoMdColorPalette title={`Color`} /> Color
                        </p>
                        {activeDropdown === "color" && (
                            <div className="dropdown-content">
                                <CategoryColorVariant
                                    colorVariant={categoryByColor}
                                    searchParams={searchParams}
                                />
                            </div>
                        )}
                    </div>
                )}
                {categoryBySize?.length > 0 && (
                    <div className="dropdown-container">
                        <p onClick={() => handleToggle("size")}>
                            <FaArrowDownShortWide title={`Size`} /> Size
                        </p>
                        {activeDropdown === "size" && (
                            <div className="dropdown-content">
                                <CategoryVariant
                                    variantData={categoryBySize}
                                    mergeId={1}
                                    countItem={false}
                                    type="size"
                                    searchParams={searchParams}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FiltersCategoryMobile;
