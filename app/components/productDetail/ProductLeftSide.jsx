"use client";
import { storeProductId } from "@/app/utils";
import ProductImage from "./ProductImage";
import { useState } from "react";
import ProductInformetion from "./ProductInformetion";
import ProductLongDescription from "./ProductLongDescription";

const ProductLeftSide = ({ productInfo }) => {
    const [productGallery, setProductGallery] = useState(productInfo.gallery);

    storeProductId(productInfo?.id);

    return (
        <div className=" col-xl-9">
            <div className="row">
                <ProductImage
                    productInfo={productInfo}
                    // path_name={path_name}
                    productGallery={productGallery}
                />
                <ProductInformetion
                    productInfo={productInfo}
                    setProductGallery={setProductGallery}
                />
            </div>
            <ProductLongDescription productInfo={productInfo} />
        </div>
    );
};

export default ProductLeftSide;
