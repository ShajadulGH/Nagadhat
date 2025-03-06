"use client";

import { getManageIdVerificationInfo } from "@/app/services/getManageIdVerificationInfo";
import { getSyncManageIdVerificationInfo } from "@/app/services/getSyncManageIdVerificationInfo";
import { postManageIdVerificationInfo } from "@/app/services/postManageIdVerificationInfo";
import { NagadhatPublicUrl } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const ManageIDVerification = () => {
    const [isPending, startTransition] = useTransition();
    const [idVerification, setIdVerification] = useState({
        nid_no: "",
        nid_front: "",
    });

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            const fetchNidVerification = async () => {
                const nidData = await getManageIdVerificationInfo(
                    session?.accessToken
                );
                const nidDataResult = nidData?.results || {};
                setIdVerification({
                    nid_no: nidDataResult.nid_no || "",
                    nid_front: nidDataResult.nid_front || "",
                });
            };
            fetchNidVerification();
        }
    }, [session?.accessToken, status]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setIdVerification((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setIdVerification((prevData) => ({
                ...prevData,
                nid_front: event.target.files[0],
            }));
        } else {
            toast.error("No file selected. Please choose a valid image file.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check for required fields
        if (!idVerification?.nid_no) {
            toast.error("Please fill out all required fields.");
            return;
        }

        try {
            startTransition(async () => {
                const response = await postManageIdVerificationInfo(
                    idVerification,
                    session?.accessToken
                );

                if (!response?.error) {
                    setIdVerification({
                        nid_no: response?.results?.nid_no,
                        nid_front: response?.results?.nid_front,
                    });
                    toast.success(response?.message);
                } else {
                    console.error("Update failed:", response?.message);
                    toast.error(
                        response?.message ||
                            "Failed to update ID Verification Info."
                    );
                }
            });
        } catch (error) {
            console.error("Error during update:", error);
            toast.error(
                error.message || "An error occurred. Please try again later."
            );
        }
    };

    const handleDataSync = async () => {
        try {
            startTransition(async () => {
                const nidData = await getSyncManageIdVerificationInfo(
                    session?.accessToken, session?.phone
                );
                const nidDataResult = nidData?.results || {};
                console.log(nidData);
                setIdVerification({
                    nid_no: nidDataResult.nid_no || "",
                });
            });
        } catch (error) {
            console.error("Error fetching ID Verification data:", error);
            toast.error(
                error.message || "An error occurred. Please try again later."
            );
        }
    }

    return (
        <div className="accordion-item border-0 rounded mb-4">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed bg-white rounded customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                >
                    ID Verification
                </button>
            </h2>
            <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
            >
                <div className="accordion-body border-top">
                    <div className="customer-manage-profile-from-area">
                        {(session?.phone && String(session?.phone).length > 11) && (
                            <div className="ms-auto">
                                <button className="add-to-cart-link border-0 ms-auto" onClick={handleDataSync}>
                                    sync
                                </button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nid_no" className="form-label">
                                    NID/ Birth Certificate/ Passport/ Driving
                                    License No
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="nid_no"
                                    name="nid_no"
                                    value={idVerification.nid_no}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {idVerification.nid_front && (
                                <div className="mb-3">
                                    <Image
                                        src={`${NagadhatPublicUrl}/${idVerification.nid_front}`}
                                        width={120}
                                        height={100}
                                        alt="NID Image"
                                    />
                                </div>
                            )}

                            <div className="mb-3">
                                <label
                                    htmlFor="nid_front"
                                    className="form-label"
                                >
                                    Upload NID/ Birth Certificate/ Passport/ Driving License Photo
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="nid_front"
                                    accept="image/*"
                                    name="nid_front"
                                    // capture
                                    onChange={handleFileChange}
                                />
                            </div>
                            <span className="text-danger">
                                * Please upload original picture, photocopy not allowed.
                            </span>
                            <div className="pt-3">
                                <button
                                    className="add-to-cart-link border-0 mx-auto"
                                    type="submit"
                                    disabled={isPending}
                                    style={{
                                        cursosEvents: isPending ? "none" : "pointer",
                                        opacity: isPending ? "0.5" : "1",
                                    }}
                                >
                                    {isPending ? (
                                        <div
                                            style={{
                                                height: "21px",
                                                width: "96px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <RotatingLines
                                                visible={true}
                                                height="18"
                                                width="20"
                                                color="#ffffff"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="w-25"
                                            />
                                        </div>
                                    ) : (
                                        "Update Info"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageIDVerification;
