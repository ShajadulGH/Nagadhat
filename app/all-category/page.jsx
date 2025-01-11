
import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllCategories from "../components/viewAllProduct/ViewAllCategories";
import { getHomeCategory } from "../services/getHomeCategory";
import { NagadhatPublicUrl } from "../utils";
import Pagination from "../components/productCategory/Pagination";
import RecentViewProduc from "../components/RecentViewProduc";

const AllCategoryPage = async ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;
    let viewCategoryData = [];
    let bannerUrl = "/images/fashion.jpg";
    let lastPage = 1;
    const limit = 24; //Per Page Category

    const categoryData = await getHomeCategory(page, limit);
    viewCategoryData = categoryData?.data;
    lastPage = categoryData?.last_page;
    if (viewCategoryData?.length >= 1 && viewCategoryData[0].banner_image) {
        bannerUrl = `${NagadhatPublicUrl}/${viewCategoryData[0].banner_image}`;
    }

    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />
            <ViewAllCategoryTitle title="Categories" />
            <ViewAllCategories isCategory={true} viewCategoryData={viewCategoryData} />
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

export default AllCategoryPage;
