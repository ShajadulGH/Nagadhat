import Service from "../components/Service";
import ViewAllBanner from "../components/viewAllProduct/ViewAllBanner";
import ViewAllCategoryTitle from "../components/viewAllProduct/ViewAllCategoryTitle";
import ViewAllProduct from "../components/viewAllProduct/ViewAllProduct";
import { getHomeFlashSalesProduct } from "../services/getHomeFlashSalesProduct";
import Pagination from "../components/productCategory/Pagination";
import RecentViewProduc from "../components/RecentViewProduc";

const AllFlashSalesProductPage = async ({ searchParams }) => {
    let viewProductData = [];
    let flashSaleEndData = null;
    let bannerUrl = "/images/fashion.jpg";
    let lastPage = 1;
    const page = parseInt(searchParams?.page) || 1;
    const districtId = searchParams?.districtId || 1;
    const limit = 24;

    try {
        const flashSaleProductData = await getHomeFlashSalesProduct(districtId, page, limit);
        flashSaleEndData = flashSaleProductData?.results?.flash_sale_info?.end_time;
        viewProductData = flashSaleProductData?.results?.flash_sales_product?.data;
        lastPage = flashSaleProductData?.results?.flash_sales_product?.last_page;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="container view-all-product-container">
            <ViewAllBanner imageUrl={bannerUrl} />

            <ViewAllCategoryTitle
                title="Flash Sale"
                isFlashSaleTimer={true}
                flashSaleEndData={flashSaleEndData}
            />

            

            <div className="view-all-product-area" >
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

export default AllFlashSalesProductPage;
