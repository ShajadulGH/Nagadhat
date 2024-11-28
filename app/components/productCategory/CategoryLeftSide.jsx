import CategorySectionTitle from "./CategorySectionTitle";
import SubCategoryList from "./SubCategoryList";
import PriceRange from "./PriceRange";
import CategoryVariant from "./CategoryVariant";
import CategoryColorVariant from "./CategoryColorVariant";

const CategoryLeftSide = ({
    categoryByBrand,
    categoryByColor,
    categoryBySize,
    subCategoryTitle,
    categoryByMinPrice,
    categoryByMaxPrice,
    searchParams,
    allSubCategories,
    categoryTotalMaxPrice,
    categoryTotalMinPrice
}) => {
    const subCategoryData = allSubCategories;
    const brandData = categoryByBrand;
    const sizedData = categoryBySize;
    const colorData = categoryByColor;
    const shouldShowPriceRange = categoryByMinPrice && categoryByMaxPrice;
    
    return (
        <aside className="product-category-left-Side d-none d-xl-block">
            <div className="category-left-Side-info">
                {subCategoryData?.length > 0 && (
                    <>
                        <CategorySectionTitle title={`Sub Categories`} />
                        <SubCategoryList subCategoryData={allSubCategories} />
                    </>
                )}
                {shouldShowPriceRange && (
                    <>
                        <CategorySectionTitle title={`Price Range`} />
                        <PriceRange
                            categoryByMinPrice={categoryByMinPrice}
                            categoryByMaxPrice={categoryByMaxPrice}
                            categoryTotalMinPrice={categoryTotalMinPrice}
                            categoryTotalMaxPrice={categoryTotalMaxPrice}
                            searchParams={searchParams}
                        />
                    </>
                )}

                {categoryByBrand?.length > 0 && (
                    <>
                        <CategorySectionTitle title={`Brand`} />
                        <CategoryVariant
                            variantData={brandData}
                            type="brand"
                            searchParams={searchParams}
                        />
                    </>
                )}
                {categoryByColor?.length > 0 && (
                    <>
                        <CategorySectionTitle title={`Color`} />
                        <CategoryColorVariant
                            colorVariant={colorData}
                            searchParams={searchParams}
                        />
                    </>
                )}
                {categoryBySize?.length > 0 && (
                    <>
                        <CategorySectionTitle title={`Size`} />
                        <CategoryVariant
                            variantData={sizedData}
                            mergeId={1}
                            countItem={false}
                            type="size"
                            searchParams={searchParams}
                        />
                    </>
                )}
            </div>
        </aside>
    );
};

export default CategoryLeftSide;
