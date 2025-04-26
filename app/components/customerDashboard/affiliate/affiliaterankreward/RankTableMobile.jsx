import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const RankTableMobile = ({ rankList = [], handleClaimReward }) => {
    return (
        <div className="d-block d-md-none">
            {rankList?.map((items, index) => {
                const rank = items;

                return (
                    <div key={index} className="card mb-3 p-3 border rounded shadow-sm">
                        <div className="d-flex align-items-center mb-3">
                            <Image
                                src={`${NagadhatPublicUrl}/${rank?.logo}`}
                                width={40}
                                height={40}
                                alt={rank?.level}
                            />
                            <h6 className="mb-0 ms-2">{rank?.level}</h6>
                        </div>

                        <div className="row">
                           
                                <div className="col-6 mb-2">
                                    <strong>Direct Sales:</strong><br />
                                        {items?.user_direct_sales || 0} {" "}| {" "}
                                        {items?.direct_sales || 0}
                                </div>
                          

                            <div className="col-6 mb-2">
                                <strong>1st Highest Sales:</strong><br />
                                {
                                    `${rank?.user_line_01_sales} | ${rank?.line_01_sales}`
                                }
                            </div>

                            <div className="col-6 mb-2">
                                <strong>2nd Highest Sales:</strong><br />
                                {
                                    `${rank?.user_line_02_sales} | ${rank?.line_02_sales}`
                                }
                            </div>

                            <div className="col-6 mb-2">
                                <strong>Others Highest Sales:</strong><br />
                                {
                                    `${rank?.user_others_line} | ${rank?.others_line}`
                                }
                            </div>
                        </div>

                        <div className="mt-3">
                            <button
                                onClick={() => {
                                    if (
                                        rank?.status === 0 ||
                                        rank?.status === 1 ||
                                        rank?.status === 4
                                    ) {
                                        handleClaimReward(items);
                                    }
                                }}
                                className="btn w-100 add-to-cart-link"
                                style={{
                                    background:
                                        rank?.status === 0
                                            ? "gray"
                                            : rank?.status === 2
                                            ? "yellow"
                                            : rank?.status === 3
                                            ? "#0089B9"
                                            : "",
                                    color:
                                        rank?.status === 3 || rank?.status === 4 || rank?.status === 1
                                            ? "#fff"
                                            : rank?.status === 2
                                            ? "#000"
                                            : "",
                                    cursor:
                                        rank?.status === 0 ||
                                        rank?.status === 1 ||
                                        rank?.status === 4
                                            ? "pointer"
                                            : "auto",
                                }}
                            >
                                {rank?.status === 0
                                    ? "Rank Not Achieved"
                                    : rank?.status === 1
                                    ? "Claim Reward"
                                    : rank?.status === 2
                                    ? "Reward Claimed"
                                    : rank?.status === 3
                                    ? "Claim Approved"
                                    : rank?.status === 4
                                    ? "Claim Reward"
                                    : ""}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RankTableMobile;
