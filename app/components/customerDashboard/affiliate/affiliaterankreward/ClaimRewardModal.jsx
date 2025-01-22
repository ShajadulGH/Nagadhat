"use client";

import LodingFixed from "@/app/components/LodingFixed";
import { postAffiliateRankRewards } from "@/app/services/rankreward/postAffiliateRankRewards";
import { NagadhatPublicUrl } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ClaimRewardModal = ({
    show,
    handleClose,
    rewardDetails,
    setStatusChange,
    statusChange,
}) => {
    const [fadeEffect, setFadeEffect] = useState(false);
    const [visible, setVisible] = useState(false);
    const { data: session, status } = useSession();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        let fadeTimer;
        if (show) {
            setVisible(true);
            fadeTimer = setTimeout(() => setFadeEffect(true), 10);
        } else {
            setFadeEffect(false);
            fadeTimer = setTimeout(() => setVisible(false), 300);
        }
        return () => clearTimeout(fadeTimer);
    }, [show]);

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal")) {
            closeModalWithFade();
        }
    };

    const closeModalWithFade = () => {
        setFadeEffect(false);
        setTimeout(() => handleClose(), 300);
    };

    if (!visible) return null;

    const handleRewardClaim = async (rewardType, Id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to claim for ${
                rewardType === "money"
                    ? rewardDetails?.rewards_money + " Taka "
                    : rewardDetails?.rewards_prize
            } !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#44BC9D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (
                    rewardDetails?.status !== 1 &&
                    rewardDetails?.status !== 4
                ) {
                    toast.error("This reward cannot be claimed");
                    return;
                }

                if (!session?.accessToken) {
                    toast.warn("You must be logged in to claim rewards.");
                    return;
                }

                const claimRewardData = {
                    rankings_levels_id: rewardDetails?.id,
                    reward_id: Id,
                    reward_type: rewardType,
                    reward_value: rewardDetails?.rewards_money,
                    reward_status: 0,
                    reason: "",
                };

                try {
                    startTransition(async () => {
                        const responseReward = await postAffiliateRankRewards(
                            session?.accessToken,
                            claimRewardData
                        );
                        if (responseReward?.code === 200) {
                            toast.success(
                                responseReward?.message ||
                                    "Reward claimed successfully!"
                            );
                            setStatusChange(!statusChange);
                            closeModalWithFade();
                        } else {
                            toast.error(
                                responseReward?.message ||
                                    "Failed to claim reward."
                            );
                        }
                    });
                } catch (error) {
                    console.error("Error claiming reward", error);
                    toast.error(
                        "An error occurred while claiming the reward. Please try again."
                    );
                }
            }
        });
    };

    const rewardImageUrl = rewardDetails?.reward_image
        ? `${NagadhatPublicUrl}/${encodeURIComponent(
              rewardDetails.reward_image
          )}`
        : "/images/placeholder--image.jpg";

    return (
        <>
            {isPending && (
                <div className="loading-overlay">
                    <LodingFixed />
                </div>
            )}

            <div
                className={`modal fade ${fadeEffect ? "show" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: visible ? "block" : "none",
                    background: "rgba(0,0,0,.5)",
                    transition: "opacity 0.3s ease",
                }}
                aria-modal="true"
                onMouseDown={handleOutsideClick}
            >
                <div
                    className="modal-dialog modal-dialog-centered "
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Claim Your Rewards {rewardDetails?.level}{" "}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModalWithFade}
                                disabled={isPending}
                            ></button>
                        </div>
                        <div className="modal-body ">
                            <div className="row">
                                {rewardDetails?.rewards_money === 0 ? (
                                    <div className="rewards-gif-image-item col-md-12">
                                        <div className="">
                                            <Image
                                                className="img-fluid m-auto d-block"
                                                width={300}
                                                height={120}
                                                src={rewardImageUrl}
                                                alt={`${rewardDetails?.level}`}
                                                onClick={() => {
                                                    if (
                                                        (rewardDetails?.status ===
                                                            1 ||
                                                            rewardDetails?.status ===
                                                                4) &&
                                                        !isPending
                                                    ) {
                                                        handleRewardClaim(
                                                            "prize",
                                                            2
                                                        );
                                                    }
                                                }}
                                                style={{
                                                    cursor:
                                                        (rewardDetails?.status ===
                                                            1 ||
                                                            rewardDetails?.status ===
                                                                4) &&
                                                        !isPending
                                                            ? "pointer "
                                                            : "not-allowed",
                                                    objectFit: "scale-down",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : rewardDetails.status === 2 ? (
                                    <h5 className="lh-sm text-danger">
                                        Your reward claim request has been
                                        received. Please wait for admin
                                        approval. You will be notified once your
                                        reward is approved. Thank you for your
                                        patience!
                                    </h5>
                                ) : rewardDetails.status === 3 ? (
                                    <h5 className="lh-sm  text-success">
                                        Congratulations! Your claim has been
                                        successfully approved. You can now
                                        proceed with the next steps. Thank you
                                        for your patience and trust in our
                                        services!
                                    </h5>
                                ) : (
                                    <>
                                        <div className="rewards-gif-image-item col-md-12">
                                            <div className="">
                                                <Image
                                                    className="img-fluid m-auto d-block"
                                                    style={{
                                                        cursor:
                                                            (rewardDetails?.status ===
                                                                1 ||
                                                                rewardDetails?.status ===
                                                                    4) &&
                                                            !isPending
                                                                ? "pointer"
                                                                : "not-allowed",
                                                        objectFit: "scale-down",
                                                    }}
                                                    width={300}
                                                    height={120}
                                                    src={`/images/Taka.png`}
                                                    alt={`${rewardDetails?.level}`}
                                                    onClick={() => {
                                                        if (
                                                            (rewardDetails?.status ===
                                                                1 ||
                                                                rewardDetails?.status ===
                                                                    4) &&
                                                            !isPending
                                                        ) {
                                                            handleRewardClaim(
                                                                "money",
                                                                1
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="rewards-gif-image-item col-md-6">
                                        <div className="">
                                            <Image
                                                width={460}
                                                height={350}
                                                src={rewardImageUrl}
                                                alt={`${rewardDetails?.level}`}
                                                onClick={() => {
                                                    if (
                                                        rewardDetails?.status ===
                                                        1 && !isPending
                                                    ) {
                                                        handleRewardClaim(
                                                            "prize",
                                                            2
                                                        );
                                                    }
                                                }}
                                                style={{
                                                    cursor:
                                                        rewardDetails?.status ===
                                                        1 && !isPending
                                                            ? "pointer "
                                                            : "not-allowed",
                                                }}
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div> */}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer d-flex align-items-center justify-content-between">
                            <h4 style={{ color: "#44bc9d", fontSize: "16px" }}>
                                {rewardDetails?.rewards_details ||
                                    "No rewards details available"}
                            </h4>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={closeModalWithFade}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClaimRewardModal;
