"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCategoryItem from "./ProductCategoryItem";
import ProductBrandsItem from "./ProductBrandsItem";

const ProductBrands = ({
    categoryBrandData,

    isHome = true,
}) => {
    const isMoreThanEight = categoryBrandData?.length > 8;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isHome ? 8 : 6,
        slidesToScroll: isHome ? 1 : 1,
        rows: isMoreThanEight ? 2 : 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: isHome ? 6 : 3,
                    slidesToScroll: isHome ? 1 : 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
        ],
    };

    return (
        <div className="row nh-categories-row">
            <div className="col-md-12">
                <div className="nh-categories-holder-s">
                    <Slider {...settings}>
                        {categoryBrandData?.map((itme) => (
                            <ProductBrandsItem
                                key={itme.id}
                                categoryItem={itme}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ProductBrands;
