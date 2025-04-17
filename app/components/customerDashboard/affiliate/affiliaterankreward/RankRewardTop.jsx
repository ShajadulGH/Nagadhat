import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const RankRewardTop = ({ affiliateData }) => {
    const lastItem = affiliateData[affiliateData.length - 1];
    console.log("lastItem===>", lastItem);
    let imageUrl;
    if (lastItem?.logo) {
        imageUrl = `${NagadhatPublicUrl}/${lastItem?.logo}`;
    }
    return (
        <>
            <div className="customer-dashboard-order-history-title d-flex align-items-center justify-content-between pt-0">
                <h2 className="customer-dashboard-title">
                    Ranks: {lastItem?.level}
                </h2>
                <div className="">
                    <Image
                        className="rounded-circle"
                        src={imageUrl || "/images/men222222.png"}
                        width={60}
                        height={60}
                        alt={lastItem?.level}
                    />
                </div>
            </div>
        </>
    );
};

export default RankRewardTop;
