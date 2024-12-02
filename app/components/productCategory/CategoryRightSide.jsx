// import SectionTitle from "../SectionTitle";
// import ProductCategories from "../ProductCategories";
// import FindLooking from "./FindLooking";
import CategoryProductArchive from "./CategoryProductArchive";
import ShotBy from "./ShotBy";
import NoDataFound from "../NoDataFound";
import Pagination from "./Pagination";
import FiltersCategoryMobile from "./FiltersCategoryMobile";

const CategoryRightSide = ({
    categoryByProduct,
    categoryByResult,
    categoryTitle,
    searchParams,
    currentPage,
    lastPage,
    totalProduct,
    loading,
    categoryByBrand,
    categoryByColor,
    categoryBySize,
    subCategoryTitle,
    categoryByMinPrice,
    categoryByMaxPrice,
    allSubCategories,
    categoryTotalMaxPrice,
    categoryTotalMinPrice
}) => {
    const categoryMainTitle = categoryTitle?.title;
    let categoryProductLength = categoryByProduct?.length;

    return (
        <section className="product-category-right-Side">
            <div className="category-right-Side">
                <div className="all-category-item-area">
                    <div className="all-category-item d-none d-xl-block">
                        {totalProduct > 0 && categoryMainTitle?.length > 0 && (
                            <p>
                                {totalProduct} Items Found “{categoryMainTitle}”
                            </p>
                        )}
                    </div>
                    <div className="all-category-item d-xl-none">
                        {categoryProductLength > 0 && (
                            <FiltersCategoryMobile
                            categoryByBrand={categoryByBrand}
                            categoryByColor={categoryByColor}
                            categoryBySize={categoryBySize}
                            subCategoryTitle={subCategoryTitle}
                            categoryByMinPrice={categoryByMinPrice}
                            categoryByMaxPrice={categoryByMaxPrice}
                            categoryTotalMinPrice={categoryTotalMinPrice}
                            categoryTotalMaxPrice={categoryTotalMaxPrice}
                            allSubCategories={allSubCategories}
                            searchParams={searchParams}
                            />
                        )}
                    </div>
                    {categoryProductLength > 0 && (
                        <ShotBy
                            searchParams={searchParams}
                            categoryByProduct={categoryByProduct}
                        />
                    )}
                </div>
                {categoryProductLength > 0 ? (
                    <CategoryProductArchive
                        productArvhiveList={categoryByProduct}
                    />
                ) : (
                    !loading &&
                    <NoDataFound />
                )}
                <div className=" pt-4">
                    <Pagination currentPage={currentPage} lastPage={lastPage} />
                </div>
            </div>
        </section>
    );
};

export default CategoryRightSide;
