"use client";
import { postPrivilegeCardShoppingChoice } from "@/app/services/privilegeCard/postPrivilegeCardShoppingChoice";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
const PrivilegeChooseOptionBtn = () => {
    const startShoppingModal = useRef(null);
    const { data: session } = useSession();

    console.log("session", { session });

    const handleListedProductClick = async () => {
        const rebateData = {
            rebate: 1,
        };
        try {
            const response = await postPrivilegeCardShoppingChoice(
                session?.accessToken,
                rebateData
            );
            console.log("API Response:", response);

            if (response?.code === 200) {
                toast.success(
                    response?.message,
                    "Shopping choice submitted successfully!"
                );
                if (startShoppingModal.current) {
                    const modalInstance = bootstrap.Modal.getInstance(
                        startShoppingModal.current
                    );
                    modalInstance?.hide();
                }
            } else {
                toast.error(
                    "Failed to submit shopping choice. Please try again."
                );
            }
        } catch (error) {
            console.error("Error submitting shopping choice:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="mt-3 mt-md-5 mb-3 mb-md-4">
                <div className="bg-white shadow-lg rounded-4 p-4 d-flex flex-column flex-md-row  justify-content-center align-items-center gap-2">
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#choose-listed-modal"
                        className="w-100 w-md-50 add-to-cart-link border-0 rounded-3 text-capitalize"
                    >
                        Choose Listed Products
                    </button>
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#choose-own-modal"
                        className="w-100 w-md-50 add-to-cart-link border-0 rounded-3 text-capitalize"
                    >
                        Choose Own Choice Shopping
                    </button>
                </div>
            </div>
            {/* <!--choose listed Modal --> */}
            <div
                className="modal fade"
                id="choose-listed-modal"
                tabIndex="-1"
                aria-labelledby="choose-listed-modalLabel"
                aria-hidden="true"
                ref={startShoppingModal}
            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 text-black"
                                id="choose-listed-modalLabel"
                            >
                                List Choice Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p className="fs-6 text-black">
                                You will get <strong>Tk 3000 BDT</strong> for
                                free shopping on your shopping balance for
                                December, 2024. If you agree then click the
                                button.
                            </p>
                        </div>
                        <div className="modal-footer justify-content-center ">
                            <button
                                onClick={handleListedProductClick}
                                type="button"
                                className="add-to-cart-link border-0 rounded-3 text-capitalize px-4"
                            >
                                Let's start shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--Choose Own Choice Modal --> */}
            <div
                className="modal fade"
                id="choose-own-modal"
                tabIndex="-1"
                aria-labelledby="choose-own-modalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 text-black"
                                id="choose-own-modalLabel"
                            >
                                Own Choice Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p className="fs-6 text-black">
                                You will get <strong>Tk 2000 BDT</strong> for
                                free shopping on your shopping balance for
                                December, 2024. If you agree then click the
                                confirm button.
                            </p>
                        </div>
                        <div className="modal-footer justify-content-center ">
                            <button
                                type="button"
                                className="add-to-cart-link border-0 rounded-3 text-capitalize px-4"
                            >
                                Let's start shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeChooseOptionBtn;
