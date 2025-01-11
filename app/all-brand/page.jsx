
import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllCategories from "../components/viewAllProduct/ViewAllCategories";
import { getHomeBrand } from "../services/getHomeBrand";
import { NagadhatPublicUrl } from "../utils";
import Pagination from "../components/productCategory/Pagination";
import RecentViewProduc from "../components/RecentViewProduc";

const ViewAllPage = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page) || 1;
    let viewCategoryData = [];
    let bannerUrl = "/images/fashion.jpg";
    let lastPage = 1;
    const limit = 24; //Per Page Category

    const brandData = await getHomeBrand(page, limit);
    viewCategoryData = brandData?.results?.brands?.data;
    lastPage = brandData?.results?.brands?.last_page;
    if (viewCategoryData?.length >= 1 && viewCategoryData[0].banner) {
        bannerUrl = `${NagadhatPublicUrl}/${viewCategoryData[0].banner}`;
    }

    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />
            <ViewAllCategoryTitle title="Brands" />
            <ViewAllCategories isCategory={false} viewCategoryData={viewCategoryData} />
            <div className="view-all-product-pagination-area ">
                <Pagination
                    currentPage={page}
                    lastPage={lastPage}
                />
            </div>
            <RecentViewProduc />
            <Service />
        </div>
    );
};

export default ViewAllPage;
