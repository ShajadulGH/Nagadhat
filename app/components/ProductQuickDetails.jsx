import React from "react";
import NoDataFound from "@/app/components/NoDataFound";
import Breadcrumb from "@/app/components/productDetail/Breadcrumb";
import ProductInformetion from "./productDetail/ProductInformetion";
import ProductSlider from "./productDetail/ProductSlider";
const ProductQuickDetails = ({ productInfo }) => {
    const [productGallery, setProductGallery] = React.useState(
        productInfo?.gallery
    );

    return (
        <>
            <section className="product-details-section">
                <div className="container">
                    {productInfo?.id ? (
                        <>
                            <div className="product-details-info">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="product-img-slider-area">
                                            <ProductSlider
                                                productGallery={productGallery}
                                                productInfo={productInfo}
                                            />
                                        </div>
                                    </div>
                                    <ProductInformetion
                                        productInfo={productInfo}
                                        setProductGallery={setProductGallery}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductQuickDetails;
