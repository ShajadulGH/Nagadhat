import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { IoMdWarning } from "react-icons/io";

const AffiliateDashboardRank = ({ affiliateData }) => {
    const imageUrl = affiliateData?.profile_picture
        ? `${NagadhatPublicUrl}/${affiliateData?.profile_picture}`
        : `/images/men222222.png`;

    return (
        <>
            <div className="affiliate-user-rank-holder d-block">
                <div className="d-flex justify-content-between align-items-center w-100 ">
                    <h2 className="customer-dashboard-subtitle">
                        Rank: {affiliateData?.rank}
                    </h2>
                    <div className="affiliate-user-avate">
                        <Image
                            src={imageUrl}
                            alt="User profile"
                            width={60}
                            height={60}
                            className="rounded-circle"
                        />
                    </div>
                </div>
                {affiliateData?.otp_status === 1 && (
                    <div class="alert alert-warning border border-warning shadow-lg rounded-3 p-3 mt-3 ">
                        <div class="d-flex gap-3">
                            <div
                                className="text-dark"
                                style={{ fontFamily: "'Tiro Bangla', serif" }}
                            >
                                <h5 class="pin-warning-titles fw-semibold text-warning text-black d-flex align-items-center gap-2 mb-0">
                                    <IoMdWarning
                                        style={{ marginBottom: "2px" }}
                                    />{" "}
                                    <span>সতর্কবার্তা!</span>
                                </h5>
                                <p class="mb-0  fs-6">
                                    আপনি এখনো ট্রানজেকশন পিন সেট করেননি। আপনার অ্যাকাউন্টটি সুরক্ষিত রাখতে এখনই{" "}
                                    <Link
                                        href="/others-password-txn-otp"
                                        class=" add-to-cart-link d-inline-block pt-1 pb-0 fw-semibold shadow-sm mt-2 rounded-2"
                                    >
                                        🔒 পিন সেট করুন
                                    </Link>{" "}
                                    এবং আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করুন।
                                </p>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AffiliateDashboardRank;
