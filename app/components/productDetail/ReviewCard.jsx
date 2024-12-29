import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { HiOutlineStar } from "react-icons/hi2";
import { NagadhatPublicUrl } from "@/app/utils";

const ReviewCard = () => {
    return (
        <div>
            <div className="d-flex gap-2 justify-content-between align-items-start mb-3">
                <div
                    className="flex-shrink-0"
                    style={{ width: "60px", height: "60px" }}
                >
                    <Image
                        width={60}
                        height={60}
                        style={{ borderRadius: "10px" }}
                        src="/images/profile-3.png"
                        alt="fashion-icon"
                    />
                </div>
                <div className="content flex-grow-1 ms-2">
                    <div className="d-flex align-items-center justify-content-start gap-2">
                        <div className="d-flex align-items-center text-primary fs-6 ">
                            <span className="me-1 text-primary-color">
                                <FaStar />
                            </span>
                            <span className="me-1 text-primary-color">
                                <FaStar />
                            </span>
                            <span className="me-1 text-primary-color">
                                <FaStar />
                            </span>
                            <span className="me-1 text-primary-color">
                                <HiOutlineStar />
                            </span>
                            <span className="me-1 text-primary-color">
                                <HiOutlineStar />
                            </span>
                        </div>
                        {/* <p className="small text-muted mt-1">- 20-25-2025</p> */}
                    </div>
                    <div className="d-flex gap-1 align-items-center mt-2">
                        <h4 className="h6 text-muted fw-semibold">
                          Md.Kamal Ahmed
                        </h4>
                    </div>
                </div>
            </div>

            <div>
                <p>
                    {" "}
                    love this top, I had purchased a size L ( I wear a size 10,
                    30 in waist, 40 bust ) but had to return because it felt a
                    little too snug, I am older and don't like things too tight;
                    The XL fits great due to the stretch, and it gives me a
                    great silhouette
                </p>
                <div className="mt-3">
                    <Image
                        width={200}
                        height={200}
                        style={{ borderRadius: "10px" }}
                        className="img-fluid"
                        src="/images/fashion.jpg"
                        alt="fashion-icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
