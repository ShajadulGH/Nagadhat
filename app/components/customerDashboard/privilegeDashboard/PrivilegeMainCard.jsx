import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import PrivilegeBuyNowBtn from "./PrivilegeBuyNowBtn";
import PrivilegeChooseOptionBtn from "./PrivilegeChooseOptionBtn";
import PrivilegeCancelledModal from "./PrivilegeCancelledModal";
import ShowingProductPrices from "./ShowingProductPrices";

const PrivilegeMainCard = ({ privilegeCardInfo, session }) => {
    const frontImageUrl = privilegeCardInfo?.privilege_card?.front_image
        ? `${NagadhatPublicUrl}/${privilegeCardInfo.privilege_card.front_image}`
        : "/path-to-default-front-image.jpg";

    const backImageUrl = privilegeCardInfo?.privilege_card?.back_image
        ? `${NagadhatPublicUrl}/${privilegeCardInfo.privilege_card.back_image}`
        : "/path-to-default-back-image.jpg";

    return (
        <div className="customer-dashboard-order-history-title">
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
                        ৳ {privilegeCardInfo?.purchases_price || 0}
                    </strong>
                    <h6 className="fs-6">{privilegeCardInfo?.product_name}</h6>
                    <div className="pt-2 d-flex align-items-center gap-2">
                        <button
                            type="button"
                            className="add-to-cart-link border-0 rounded-3 text-capitalize"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            Details
                        </button>
                        <PrivilegeBuyNowBtn
                            privilegeCardInfo={privilegeCardInfo}
                            session={session}
                        />
                        {privilegeCardInfo?.status === 2 && (
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#privilege-cancelled-modal"
                                className="border-0 rounded-3 text-capitalize add-to-cart-link bg-danger"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <PrivilegeCancelledModal />
            {privilegeCardInfo?.product_name !== "Membership Card" && (
                <PrivilegeChooseOptionBtn />
            )}

            {privilegeCardInfo?.product_name !== "Membership Card" && (
                <ShowingProductPrices />
            )}
        </div>
    );
};

export default PrivilegeMainCard;
