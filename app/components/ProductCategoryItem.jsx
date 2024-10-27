import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NagadhatPublicUrl, truncateTitle } from "../utils";

const ProductCategoryItem = ({ categoryItem }) => {
    let imageurl = `${NagadhatPublicUrl}/${categoryItem.logo}`;
    const altText = categoryItem?.title ? categoryItem?.title : "";
    const { slug, title } = categoryItem;
    let path = slug;

    if (!path) {
        path = "#";
    }

    return (
        <div className="nh-categories-item">
            <div className="nh-categories-item-bg nh-hover-box-shadow">
                <Link href={`category/${path}`}>
                    <div className="nh-categories-img image-hover-effect">
                        <Image
                            src={imageurl}
                            className="img-fluid"
                            alt={altText}
                            fill={true}
                        />
                    </div>
                    <div className="nh-categories-info text-hover-effect text-capitalize text-center">
                        <h4>{truncateTitle(title, 20)}</h4>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProductCategoryItem;
