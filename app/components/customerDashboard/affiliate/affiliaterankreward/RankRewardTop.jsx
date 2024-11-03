import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const RankRewardTop = ({ affiliateData }) => {
    let imageUrl;
    if (affiliateData?.profile_picture) {
        imageUrl = `${NagadhatPublicUrl}/${affiliateData?.profile_picture}`;
    }
    return (
        <>
            <div className="customer-dashboard-order-history-title d-flex align-items-center justify-content-between">
                <h1 className="customer-dashboard-title">
                    Ranks: {affiliateData?.rank}
                </h1>
                <div className="">
                    <Image
                        className="rounded-circle"
                        src={imageUrl || "/images/men222222.png"}
                        width={60}
                        height={60}
                        alt={affiliateData?.reffer_a_friend_link}
                    />
                </div>
            </div>
        </>
    );
};

export default RankRewardTop;
