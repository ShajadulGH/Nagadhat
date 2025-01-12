import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllProduct from "../components/viewAllProduct/ViewAllProduct";
import { getHomeJustForYouProduct } from "../services/getHomeJustForYouProduct";
import Pagination from "../components/productCategory/Pagination";
import RecentViewProduc from "../components/RecentViewProduc";
import  bannerUrl from "@/public/images/banner/Just For You-01.webp"

const AllJustForYouProductPage = async ({ searchParams }) => {
    let viewProductData = [];
    let lastPage = 1;
    const page = parseInt(searchParams?.page) || 1;
    const districtId = searchParams?.districtId || 47;
    const limit = 24;

    try {
        const justForYouProductData = await getHomeJustForYouProduct(districtId, page, limit);
        viewProductData = justForYouProductData?.results?.just_for_you?.data || [];
        lastPage = justForYouProductData?.results?.just_for_you?.last_page || 1;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />

            <ViewAllCategoryTitle
                title="Just For You"
            />

            <div className="view-all-product-area">
                <ViewAllProduct viewProductData={viewProductData} loading={false} />
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

export default AllJustForYouProductPage;
