"use client";
import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import PrivilegeBuyNowBtn from "./PrivilegeBuyNowBtn";
import PrivilegeChooseOptionBtn from "./PrivilegeChooseOptionBtn";
import PrivilegeCancelledModal from "./PrivilegeCancelledModal";
import ShowingProductPrices from "./ShowingProductPrices";
import { useEffect, useState } from "react";
import { getPrivilegeCardShoppingChoiceDetail } from "@/app/services/privilegeCard/getPrivilegeCardShoppingChoiceDetail";
import { getPrivilegeCardBalanceAfterChoose } from "@/app/services/privilegeCard/getPrivilegeCardBalanceAfterChoose";
import PrivilegeCardModal from "./PrivilegeCardModal";
import { useSession } from "next-auth/react";

const PrivilegeMainCard = ({
    privilegeCardInfo,
    setCancelToggleStatus,
    cancelToggleStatus,
    isPending,
}) => {
    const [toggleStatte, setToggleStatte] = useState(false);
    const [choocingProductAmount, setChoocingProductAmount] = useState({});
    const [ownChoocingAmount, setOwnChoocingAmount] = useState({});
    const [balanceAfterChoosing, setBalanceAfterChoosing] = useState({});
    const { data: session } = useSession();

    const frontImageUrl = privilegeCardInfo?.privilege_card?.front_image
        ? `${NagadhatPublicUrl}/${privilegeCardInfo.privilege_card.front_image}`
        : "/path-to-default-front-image.jpg";

    const backImageUrl = privilegeCardInfo?.privilege_card?.back_image
        ? `${NagadhatPublicUrl}/${privilegeCardInfo.privilege_card.back_image}`
        : "/path-to-default-back-image.jpg";

    // Choose Listed Products
    useEffect(() => {
        const fetchingChooseListedProducts = async () => {
            try {
                const rebate = 1;
                const response = await getPrivilegeCardShoppingChoiceDetail(
                    session?.accessToken,
                    rebate
                );
                setChoocingProductAmount(response?.results);
            } catch (error) {
                console.error("Error fetching choosing products:", error);
                console.info(error);
            }
        };
        if (privilegeCardInfo?.status === 2 && session?.accessToken) {
            fetchingChooseListedProducts();
        }
    }, [session?.accessToken]);

    // Choose Own Choice Shopping
    useEffect(() => {
        const fetchingChooseOwnShopping = async () => {
            try {
                const rebate = 2;
                const response = await getPrivilegeCardShoppingChoiceDetail(
                    session?.accessToken,
                    rebate
                );
                setOwnChoocingAmount(response?.results);
            } catch (error) {
                console.error(
                    "Error fetching Choose Own Choice Shopping",
                    error
                );
                console.info(error);
            }
        };
        if (privilegeCardInfo?.status === 2 && session?.accessToken) {
            fetchingChooseOwnShopping();
        }
    }, [session?.accessToken]);

    // balance-after-choose

    useEffect(() => {
        const fetchingBalanceAfterChoose = async () => {
            try {
                const response = await getPrivilegeCardBalanceAfterChoose(
                    session?.accessToken
                );
                setBalanceAfterChoosing(response?.results);
            } catch (error) {
                console.error("Error Fetching Balance After Choose", error);
                console.info(error);
            }
        };
        if (privilegeCardInfo?.status === 2 && session?.accessToken) {
            fetchingBalanceAfterChoose();
        }
    }, [session?.accessToken, toggleStatte]);

    return (
        <div className="customer-dashboard-order-history-title">
            {isPending ? (
                <h3 className=" text-center">Loading...</h3>
            ) : (
                <div className="flipper-container-wrapp">
                    <div className="flipper-container">
                        <div className="flip">
                            <div className="front face">
                                <Image
                                    src={frontImageUrl}
                                    alt="Privilege card front"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="back face">
                                <Image
                                    src={backImageUrl}
                                    alt="Privilege card back"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-3 py-3">
                        <strong className="fs-5 pb-3">
                            ৳ {privilegeCardInfo?.mrp_price || 0}
                        </strong>
                        <h6 className="fs-6">
                            {privilegeCardInfo?.product_name}
                        </h6>
                        <div className="pt-2 d-flex align-items-center gap-2">
                            {/* {privilegeCardInfo?.status !== 2 && ()} */}
                            <button
                                type="button"
                                className="add-to-cart-link border-0 rounded-3 text-capitalize"
                                data-bs-toggle="modal"
                                data-bs-target="#exampl-Detailse-Modal"
                            >
                                Details
                            </button>

                            <PrivilegeBuyNowBtn
                                privilegeCardInfo={privilegeCardInfo}
                            />
                            {privilegeCardInfo?.product_name !==
                                "Membership Card" &&
                            privilegeCardInfo?.cancel_status === 0 ? (
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#privilege-cancelled-modal"
                                    className="border-0 rounded-3 text-capitalize add-to-cart-link bg-danger"
                                >
                                    Cancel
                                </button>
                            ) : privilegeCardInfo?.product_name !==
                                  "Membership Card" &&
                              privilegeCardInfo?.cancel_status === 1 ? (
                                <button className="btn btn-warning">
                                    Cancel In Review
                                </button>
                            ) : (
                                privilegeCardInfo?.product_name !==
                                    "Membership Card" &&
                                privilegeCardInfo?.cancel_status === 2 && (
                                    <button className="btn btn-warning">
                                        Refunded
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Privilege Details btn Modal */}
            <PrivilegeCardModal />
            {/* PrivilegeCancelled btn Modal */}
            <PrivilegeCancelledModal
                cancelToggleStatus={cancelToggleStatus}
                setCancelToggleStatus={setCancelToggleStatus}
            />

            {privilegeCardInfo?.product_name !== "Membership Card" &&
                !isPending && (
                    <PrivilegeChooseOptionBtn
                        choocingProductAmount={choocingProductAmount}
                        toggleStatte={toggleStatte}
                        setToggleStatte={setToggleStatte}
                        ownChoocingAmount={ownChoocingAmount}
                    />
                )}

            {privilegeCardInfo?.product_name !== "Membership Card" &&
                !isPending && (
                    <ShowingProductPrices
                        balanceAfterChoosing={balanceAfterChoosing}
                    />
                )}
        </div>
    );
};

export default PrivilegeMainCard;
