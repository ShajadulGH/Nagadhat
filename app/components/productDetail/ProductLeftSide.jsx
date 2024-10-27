"use client";
import ProductImage from "./ProductImage";
import ProductInformetion from "./ProductInformetion";
import ProductLongDescription from "./ProductLongDescription";
import { useState } from "react";

const ProductLeftSide = ({ productInfo }) => {
    const [productGallery, setProductGallery] = useState([]);

    return (
        <>
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
        </>
    );
};

export default ProductLeftSide;
