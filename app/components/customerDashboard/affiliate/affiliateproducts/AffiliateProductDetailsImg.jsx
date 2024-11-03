"use client";

import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Slider from "react-slick";

function AffiliateProductDetailsImg({ productGallery, productDetails }) {
    const defaultImageUrl = `${NagadhatPublicUrl}/${productDetails?.product_thumbnail}`;

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        fade: true,
        arrows: productGallery && productGallery.length > 1,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div>
                <Slider {...settings}>
                    {productGallery && productGallery.length > 0 ? (
                        productGallery.map((item, index) => {
                            const imageUrl = `${NagadhatPublicUrl}/${item.path}`;
                            return (
                                <div
                                    key={item.id}
                                    className="product-details-info-img"
                                >
                                    <Image
                                        fill
                                        src={imageUrl}
                                        alt={`Product image ${index + 1}`}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="product-details-info-img d-flex align-items-center justify-content-center">
                            <Image
                                fill
                                src={defaultImageUrl}
                                alt="default image"
                            />
                        </div>
                    )}
                </Slider>
            </div>
        </>
    );
}

export default AffiliateProductDetailsImg;
