"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import MultipleProductSlider from "./MultipleProductSlider";
import { NagadhatPublicUrl } from "@/app/utils";
import img from "@/public/images/placeholder--image.jpg";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
function ProductSlider({ productGallery, productInfo }) {
    const image = productInfo.product_thumbnail
        ? `${NagadhatPublicUrl}/${productInfo.product_thumbnail}`
        : img;
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    return (
        <div className="slider-container">
            <Slider
                arrows={false}
                asNavFor={nav2}
                ref={sliderRef1}
                infinite={productGallery?.length > 4 ? true : false}
            >
                {productGallery?.length > 0 ? (
                    productGallery?.map((sliderItem) => (
                        <div
                            className="product-details-info-photo"
                            style={{
                                width: "350px",
                                height: "400px",
                            }}
                            key={sliderItem.id}
                        >
                            <div className="product-details-info-img">
                                <InnerImageZoom
                                    src={`${NagadhatPublicUrl}/${sliderItem.path}`}
                                    zoomSrc={`${NagadhatPublicUrl}/${sliderItem.path}`}
                                    zoomType="hover"
                                    zoomPreload={true}
                                    alt="product gallery banner image"
                                    className="img-fluid object-fit-cover"
                                />
                                {/* <Image
                                    src={`${NagadhatPublicUrl}/${sliderItem.path}`}
                                    layout="fill"
                                    alt="product gallery banner image"
                                    className="img-fluid object-fit-cover"
                                /> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="product-details-info-photo">
                        <div
                            className="product-details-info-img"
                            style={{
                                width: "350px",
                                height: "400px",
                            }}
                        >
                            {/* <Image
                                src={image}
                                layout="fill"
                                alt="product gallery banner image"
                                className="img-fluid object-fit-cover"
                            /> */}
                            <InnerImageZoom
                                src={image}
                                zoomSrc={image}
                                zoomType="hover"
                                zoomPreload={true}
                                layout="fill"
                                alt="product gallery banner image"
                                className="img-fluid object-fit-cover"
                            />
                        </div>
                    </div>
                )}
            </Slider>
            <div className="product-details-info-multiple-photo">
                <Slider
                    asNavFor={nav1}
                    ref={sliderRef2}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    infinite={productGallery?.length > 4 ? true : false}
                    pauseOnFocus={true}
                    pauseOnHover={true}
                    responsive={[
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                    ]}
                >
                    {productGallery?.length > 0 ? (
                        productGallery?.map((mImageItem) => (
                            <MultipleProductSlider
                                key={mImageItem.id}
                                multipleImage={mImageItem}
                            />
                        ))
                    ) : (
                        <MultipleProductSlider thum={image} />
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default ProductSlider;
