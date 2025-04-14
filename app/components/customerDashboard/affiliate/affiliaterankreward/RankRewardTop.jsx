import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const RankRewardTop = ({ affiliateData }) => {
    let imageUrl;
    if (affiliateData?.next_target_rank?.logo) {
        imageUrl = `${NagadhatPublicUrl}/${affiliateData?.next_target_rank?.logo}`;
    }
    return (
        <>
            <div className="customer-dashboard-order-history-title d-flex align-items-center justify-content-between">
                <h1 className="customer-dashboard-title">
                    Next Promotion Chart: {affiliateData?.next_target_rank?.level}
                </h1>
                <div className="">
                    <Image
                        className="rounded-circle"
                        src={imageUrl || "/images/men222222.png"}
                        width={60}
                        height={60}
                        alt={affiliateData?.next_target_rank?.level}
                    />
                </div>
            </div>
        </>
    );
};

export default RankRewardTop;
