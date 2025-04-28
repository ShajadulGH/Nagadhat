"use client"; // Add this at the top

import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { getProductDetails } from "@/app/services/getProductDetails";
import ProductQuickDetails from "./ProductQuickDetails";

const ProductQuickView = ({ item, modalId }) => {
    const { slug, outlet_id } = item;
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProductDetails = async () => {
        if (!slug) {
            setError("No slug provided");
            return;
        }

        setLoading(true);
        try {
            const productInfo = await getProductDetails(
                `slug=${slug}&outlet_id=${outlet_id}`
            );
            if (
                productInfo?.results &&
                productInfo.message !== "Product found in other outlets."
            ) {
                setProductDetails(productInfo.results);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Fetch data only when modal is shown
    useEffect(() => {
        const modal = document.getElementById(modalId);
        const handleShow = () => fetchProductDetails();

        modal?.addEventListener("shown.bs.modal", handleShow);
        return () => {
            modal?.removeEventListener("shown.bs.modal", handleShow);
        };
    }, [modalId, slug, outlet_id]);

    return (
        <div
            className="modal fade"
            id={modalId}
            aria-labelledby="quickViewModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div
                        className="modal-body"
                        style={{ minHeight: "600px", margin: "1rem" }}
                    >
                        <div
                            data-bs-dismiss="modal"
                            className="close-icon position-absolute"
                        >
                            <IoCloseSharp
                                className="close-logo bg-white rounded-circle p-1"
                                style={{
                                    height: "35px",
                                    width: "35px",
                                }}
                            />
                        </div>
                        {loading && (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "600px" }}
                            >
                                <div
                                    className="spinner-border"
                                    style={{ color: "#44bc9d" }}
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )}

                        {!loading && productDetails && (
                            <ProductQuickDetails productInfo={productDetails} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;
