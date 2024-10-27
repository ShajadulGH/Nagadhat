import { getHomeCategoryList } from "../services/getHomeCategoryList";
import Service from "./Service";
import SectionTitle from "./SectionTitle";
import ProductCategories from "./ProductCategories";
import JustForYou from "./JustForYou";
import { getHomePageBodyBrand } from "../services/getHomePageBodyBrand";
import ProductBrands from "./ProductBrands";

async function Category({ flashSaleEndTime, showOnHome }) {
    const serviceItems = [
        {
            imageurl: "/images/pickup.svg",
            altText: "pickup image",
            title: " Fast Delivery",
            subTitle: "Free For All Type Order",
        },
        {
            imageurl: "/images/gift-cart.svg",
            altText: "gift cart",
            title: " Best Quality",
            subTitle: "Best Product Peices",
        },
        {
            imageurl: "/images/gift-box.svg",
            altText: "gift box",
            title: " Exchange Offer",
            subTitle: "One Day To Changes",
        },
        {
            imageurl: "/images/headphone.svg",
            altText: "headphone",
            title: "  Help Center",
            subTitle: "Support System 24/7",
        },
    ];

    const categoryData = await getHomeCategoryList();
    const categoryProductData = categoryData;

    const brandData = await getHomePageBodyBrand();
    const categoryBrandData = brandData?.results?.brands;

    return (
        <section className="container">
            <div className="nh-categories-area">
                <SectionTitle title="Categories" target="category" />
                <ProductCategories categoryProductData={categoryProductData} />
            </div>
            <div className="nh-brands-area pt-0">
                <SectionTitle title="Brands" target="brand" />
                <ProductBrands categoryBrandData={categoryBrandData} />
            </div>
        </section>
    );
}

export default Category;
