"use client";
import { postPrivilegeCardShoppingChoice } from "@/app/services/privilegeCard/postPrivilegeCardShoppingChoice";
import { useSession } from "next-auth/react";
import { useRef, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
const PrivilegeChooseOptionBtn = ({
    ownChoocingAmount,
    setToggleStatte,
    toggleStatte,
    choocingProductAmount,
}) => {
    const [isPending, startTransition] = useTransition();
    const chooseListedModal = useRef(null);
    const chooseOwndModal = useRef(null);
    const { data: session } = useSession();

    const handleChooseProductClick = async (rebateID) => {
        const rebateData = { rebate: rebateID };
        try {
            startTransition(async () => {
                const response = await postPrivilegeCardShoppingChoice(
                    session?.accessToken,
                    rebateData
                );

                if (response?.code === 200) {
                    setToggleStatte(!toggleStatte);
                    toast.success(
                        response?.message ||
                            "Shopping choice submitted successfully! "
                    );

                    const modalRef =
                        rebateID === 1 ? chooseListedModal : chooseOwndModal;

                    if (modalRef?.current) {
                        document.activeElement?.blur();
                        const modalInstance = bootstrap.Modal.getInstance(
                            modalRef.current
                        );
                        modalInstance?.hide();
                    }
                } else {
                    toast.error(
                        response?.message ||
                            `Failed to submit shopping choice Please try again.`
                    );
                }
            });
        } catch (error) {
            console.error("Error submitting shopping choice:", error);
            toast.error(
                `An unexpected error occurred while choosing Please try again.`
            );
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
                ref={chooseListedModal}
                role="dialog"
                aria-labelledby="choose-listed-modalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog  modal-dialog-centered"
                    role="document"
                >
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
                                You will get{" "}
                                <strong>
                                    Tk{" "}
                                    {typeof choocingProductAmount?.amount ===
                                    "number"
                                        ? choocingProductAmount?.amount.toFixed(
                                              2
                                          )
                                        : "0.00"}{" "}
                                    BDT
                                </strong>{" "}
                                for free shopping on your shopping balance for{" "}
                                {choocingProductAmount?.date}. If you agree then
                                click the button.
                            </p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                onClick={() =>
                                    !isPending && handleChooseProductClick(1)
                                }
                                type="button"
                                className={`add-to-cart-link border-0 rounded-3 text-capitalize px-4 ${
                                    isPending ? "disabled-button" : ""
                                }`}
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
                                    <span>Let's start shopping</span>
                                )}
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
                ref={chooseOwndModal}
                role="dialog"
                aria-labelledby="choose-own-modalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog  modal-dialog-centered"
                    role="document"
                >
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
                                You will get{" "}
                                <strong>
                                    Tk{" "}
                                    {typeof ownChoocingAmount?.amount ===
                                    "number"
                                        ? ownChoocingAmount?.amount.toFixed(2)
                                        : "0.00"}{" "}
                                    BDT
                                </strong>{" "}
                                for free shopping on your shopping balance for{" "}
                                {ownChoocingAmount?.date}. If you agree then
                                click the confirm button.
                            </p>
                        </div>
                        <div className="modal-footer justify-content-center ">
                            <button
                                onClick={() =>
                                    !isPending && handleChooseProductClick(2)
                                }
                                type="button"
                                className={`add-to-cart-link border-0 rounded-3 text-capitalize px-4 ${
                                    isPending ? "disabled-button" : ""
                                }`}
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
                                    <span>Let's start shopping</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeChooseOptionBtn;
