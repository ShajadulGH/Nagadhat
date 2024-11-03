"use client";

import { postAffiliateRankRewards } from "@/app/services/rankreward/postAffiliateRankRewards";
import { NagadhatPublicUrl } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClaimRewardModal = ({
    show,
    handleClose,
    rewardDetails,
    setStatusChange,
}) => {
    const [fadeEffect, setFadeEffect] = useState(false);
    const [visible, setVisible] = useState(false);
    const { data: session, status } = useSession();

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
        if (rewardDetails?.status !== 1) {
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
            const responseReward = await postAffiliateRankRewards(
                session?.accessToken,
                claimRewardData
            );

            if (responseReward?.error) {
                toast.error(
                    responseReward?.message || "Failed to claim reward."
                );
            } else {
                toast.success(
                    responseReward?.message || "Reward claimed successfully!"
                );
                setStatusChange(responseReward);
            }
        } catch (error) {
            console.error("Error claiming reward", error);
            toast.error(
                "An error occurred while claiming the reward. Please try again."
            );
        }
    };
    const rewardImageUrl = rewardDetails?.reward_image
        ? `${NagadhatPublicUrl}/${encodeURIComponent(
              rewardDetails.reward_image
          )}`
        : "/images/placeholder--image.jpg";

    return (
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
                className="modal-dialog modal-dialog-centered modal-lg"
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
                        ></button>
                    </div>
                    <div className="modal-body ">
                        <div className="row gap-4">
                            <div className="rewards-gif-image-item col">
                                <div className="">
                                    <Image
                                        style={{
                                            cursor:
                                                rewardDetails?.status === 1
                                                    ? "pointer "
                                                    : "not-allowed",
                                        }}
                                        width={350}
                                        height={350}
                                        src={`/images/Taka.png`}
                                        alt={`${rewardDetails?.level}`}
                                        onClick={() =>
                                            rewardDetails?.status === 1 &&
                                            handleRewardClaim("money", 1)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="rewards-gif-image-item col">
                                <div
                                    className="position-relative w-100"
                                    style={{ height: "350px" }}
                                >
                                    <Image
                                        fill
                                        src={rewardImageUrl}
                                        alt={`${rewardDetails?.level}`}
                                        onClick={() =>
                                            rewardDetails?.status === 1 &&
                                            handleRewardClaim("prize", 2)
                                        }
                                        style={{
                                            cursor:
                                                rewardDetails?.status === 1
                                                    ? "pointer "
                                                    : "not-allowed",
                                        }}
                                    />
                                </div>
                            </div>
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
    );
};

export default ClaimRewardModal;
