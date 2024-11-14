// import SectionTitle from "../SectionTitle";
// import ProductCategories from "../ProductCategories";
// import FindLooking from "./FindLooking";
import CategoryProductArchive from "./CategoryProductArchive";
import ShotBy from "./ShotBy";
import NoDataFound from "../NoDataFound";
import Pagination from "./Pagination";

const CategoryRightSide = ({
    categoryByProduct,
    categoryByResult,
    categoryTitle,
    searchParams,
    currentPage,
    lastPage,
    totalProduct,
    loading
}) => {
    const categoryMainTitle = categoryTitle?.title;
    let categoryProductLength = categoryByProduct?.length;

    return (
        <main className="product-category-right-Side">
            <div className="category-right-Side">
                <div className="all-category-item-area d-flex align-items-center justify-content-between">
                    <div className="all-category-item">
                        {totalProduct > 0 && categoryMainTitle?.length > 0 && (
                            <p>
                                {totalProduct} Items Found “{categoryMainTitle}”
                            </p>
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
                {lastPage > 1 && (
                    <div className="row product-category-pagination-row">
                        <div className="col-md-12">
                            <div className="product-category-pagination-area d-flex flex-wrap align-items-center justify-content-center">
                                <Pagination currentPage={currentPage} lastPage={lastPage} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CategoryRightSide;
