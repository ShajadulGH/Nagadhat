import Image from "next/image";
import React from "react";
import ShopNowButton from "./ShopNowButton";
import { NagadhatPublicUrl } from "../utils";

const MainSliderItems = ({ sliderItem }) => {
    let imageurl = `${NagadhatPublicUrl}/${sliderItem?.banner_image}`;
    const {
        title: altText,
        title: title,
        short_title: subtitle,
        btn_text: btnText,
        btn_text: btnAltText,
        btn_link: path,
    } = sliderItem;
    return (
        <div className="hero-slider-item">
            <div className="hero-slider-photo">
                <Image
                    src={imageurl}
                    className="img-fluid"
                    alt={altText || "Image"}
                    fill={true}
                />
            </div>
            <div className="hero-slider-content">
                {title && <h1>{title}</h1>}
                {subtitle && <h2>{subtitle}</h2>}
                {btnText && (
                    <ShopNowButton
                        path={path}
                        btnText={btnText}
                        btnAltText={btnAltText}
                    />
                )}
            </div>
        </div>
    );
};

export default MainSliderItems;
