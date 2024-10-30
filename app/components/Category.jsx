import { getHomeCategoryList } from "../services/getHomeCategoryList";
import Service from "./Service";
import SectionTitle from "./SectionTitle";
import ProductCategories from "./ProductCategories";
import JustForYou from "./JustForYou";
import { getHomePageBodyBrand } from "../services/getHomePageBodyBrand";
import ProductBrands from "./ProductBrands";

async function Category() {
    const categoryData = await getHomeCategoryList();
    const categoryProductData = categoryData;

    const brandData = await getHomePageBodyBrand();
    const categoryBrandData = brandData?.results?.brands;

    return (
        <section className="container">
            <div className="nh-categories-area">
                <SectionTitle title="Categories" path="all-category" target="category" />
                <ProductCategories categoryProductData={categoryProductData} />
            </div>
            <div className="nh-brands-area pt-0">
                <SectionTitle title="Brands" path="all-brand" target="brand" />
                <ProductBrands categoryBrandData={categoryBrandData} />
            </div>
        </section>
    );
}

export default Category;
