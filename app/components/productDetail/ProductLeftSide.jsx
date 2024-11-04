"use client";
import { storeProductId } from "@/app/utils";
import ProductImage from "./ProductImage";
import ProductInformetion from "./ProductInformetion";
import ProductLongDescription from "./ProductLongDescription";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const ProductLeftSide = ({ productInfo }) => {
    const [productGallery, setProductGallery] = useState([]);
    
    storeProductId(productInfo?.id);

    return (
        <>
        <ToastContainer/>
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
