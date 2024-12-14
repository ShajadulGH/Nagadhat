"use client";
import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const PrivilegeProductDetailModal = ({ productInfo }) => {
    const imgUrl = productInfo?.product_thumbnail
        ? `${NagadhatPublicUrl}/${productInfo.product_thumbnail}`
        : "/images/DanishFoodsCondensedMilk397g.png";

    return (
        <div
            className={`modal fade privilere-modal`}
            id="handleProductModal"
            tabIndex="-1"
            aria-labelledby="handleProductModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Product Details</h1>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body py-5">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 pb-md-4">
                                <div
                                    className="w-100 position-relative"
                                    style={{ height: "400px" }}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt="product-image"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="pb-3 border-bottom">
                                    <h1 className="fs-4 mb-3">
                                        {productInfo?.product_name}
                                    </h1>
                                    <span className="add-to-cart-link text-capitalize rounded-5 d-inline-block">
                                        In stock
                                    </span>
                                </div>
                                <ul className="py-4">
                                    <li className="pb-2 fs-6">
                                        SKU: {productInfo?.products?.single_sku}
                                    </li>
                                    <li className="pb-2 fs-6">
                                        Price:{" "}
                                        <strong>
                                            ৳ {productInfo?.purchases_price}
                                        </strong>
                                    </li>
                                    <li className="pb-2 fs-6">Brand: {productInfo?.brand}</li>
                                    <li className="pb-2 fs-6">
                                        {productInfo?.products
                                            ?.short_description
                                            ? productInfo.products.short_description.replace(
                                                  /<[^>]+>/g,
                                                  ""
                                              )
                                            : ""}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger "
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeProductDetailModal;
