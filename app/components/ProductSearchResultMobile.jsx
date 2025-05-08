"use client";
import Link from "next/link";
import Image from "next/image";
import { NagadhatPublicUrl } from "@/app/utils";
import { useEffect, useState } from "react";

const ProductSearchResultMobile = ({ searchProduct, clearSearch, searchMessage }) => {
    const [imageStatus, setImageStatus] = useState({});

    useEffect(() => {
        const checkImages = async () => {
            const statusObj = {};

            await Promise.all(
                searchProduct.map((product) => {
                    const img = new window.Image();
                    const src = `${NagadhatPublicUrl}/${product?.product_thumbnail}`;

                    return new Promise((resolve) => {
                        img.src = src;
                        img.onload = () => {
                            statusObj[product?.slug] = true;
                            resolve();
                        };
                        img.onerror = () => {
                            statusObj[product?.slug] = false;
                            resolve();
                        };
                    });
                })
            );

            setImageStatus(statusObj);
        };

        if (searchProduct?.length > 0) {
            checkImages();
        }
    }, [searchProduct]);

    return (
        <div className="product-search-modal-area">
            <div
                className="product-search-modal-content your-scroll-container"
                style={{ maxHeight: "80vh", marginTop: "5px" }}
            >
                <div className="search-modal-info mt-2">
                    <ul className="similer-search-product-list">
                        {searchProduct.length == 0 ? (
                            <li className="search-not-found">
                                <p>{searchMessage}</p>
                            </li>
                        ) : (
                            searchProduct.map((product, index) => {
                                const imgSrc = `${NagadhatPublicUrl}/${product?.product_thumbnail}`;
                                const imgOk = imageStatus[product?.slug];

                                return (
                                    <li
                                        key={`${product?.product_name}-${product?.slug}-${index}`}
                                        onClick={clearSearch}
                                    >
                                        <Link
                                            href={`/products/${product?.slug}?outlet_id=${product?.outlet_id}`}
                                        >
                                            <div className="search-modal-info-inner d-flex align-content-center gap-4">
                                                <div className="search-modal-info-img">
                                                    {imgOk === false ? (
                                                        <Image
                                                            fill
                                                            src="/images/image 2.png"
                                                            alt={
                                                                product?.product_name
                                                            }
                                                        />
                                                    ) : (
                                                        <Image
                                                            fill
                                                            src={imgSrc}
                                                            alt={
                                                                product?.product_name
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="search-modal-info-details">
                                                    <p>
                                                        {product?.product_name}
                                                    </p>
                                                    <strong>
                                                        ৳ {product?.mrp_price}
                                                    </strong>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductSearchResultMobile;