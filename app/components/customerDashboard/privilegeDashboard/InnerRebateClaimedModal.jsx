"use client";
import { postPrivilegeCardShoppingChoice } from "@/app/services/privilegeCard/postPrivilegeCardShoppingChoice";
import { useSession } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner"; // Assuming you are using this for loading spinner

const InnerRebateClaimedModal = ({
    rebateRecordRecall,
    setRebateRecordRecall,
    choocingProductAmount,
    ownChoocingAmount,
}) => {
    const [isPending, startTransition] = useTransition();
    const chooseListedModal = useRef(null);
    const chooseOwndModal = useRef(null);

    const { data: session } = useSession();

    const handleChooseProductClick = async (rebateID) => {
        const rebateData = { rebate: rebateID, previousRebate: 3 };
        try {
            startTransition(async () => {
                const response = await postPrivilegeCardShoppingChoice(
                    session?.accessToken,
                    rebateData
                );

                if (response?.code === 200) {
                    setRebateRecordRecall(!rebateRecordRecall);
                    toast.success(
                        response?.message ||
                            "Shopping choice submitted successfully!"
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
                            `Failed to submit shopping choice. Please try again.`
                    );
                }
            });
        } catch (error) {
            console.error("Error submitting shopping choice:", error);
            toast.error(error.message || "Something went wrong!");
        }
    };

    return (
        <>
            {/* Modal for Choose Listed */}
            <div
                className="modal fade"
                id="rebate-listed-choose-modal"
                tabIndex="-1"
                ref={chooseListedModal}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">List Choice Details</h6>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h6>
                                You will get{" "}
                                <strong>
                                    Tk{" "}
                                    {choocingProductAmount?.amount?.toFixed(
                                        2
                                    ) || "0.00"}{" "}
                                    BDT
                                </strong>
                                for free shopping on your shopping balance for{" "}
                                {choocingProductAmount?.date}. If you agree,
                                then click the button.
                            </h6>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                onClick={() =>
                                    !isPending && handleChooseProductClick(1)
                                }
                                type="button"
                                className="btn btn-success"
                                disabled={isPending}
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
                                            height="18"
                                            width="20"
                                            color="#ffffff"
                                            strokeWidth="5"
                                        />
                                    </div>
                                ) : (
                                    "Let's start shopping"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Modal for Choose Own */}
            <div
                className="modal fade"
                id="rebate-own-choose-modal"
                tabIndex="-1"
                ref={chooseOwndModal}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Own Choice Details</h6>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <h6>
                                You will get{" "}
                                <strong>
                                    Tk{" "}
                                    {ownChoocingAmount?.amount?.toFixed(2) ||
                                        "0.00"}{" "}
                                    BDT
                                </strong>
                                for free shopping on your shopping balance for{" "}
                                {ownChoocingAmount?.date}. If you agree, then
                                click the confirm button.
                            </h6>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                onClick={() =>
                                    !isPending && handleChooseProductClick(2)
                                }
                                type="button"
                                className="btn btn-success"
                                disabled={isPending}
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
                                            height="18"
                                            width="20"
                                            color="#ffffff"
                                            strokeWidth="5"
                                        />
                                    </div>
                                ) : (
                                    "Let's start shopping"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InnerRebateClaimedModal;
