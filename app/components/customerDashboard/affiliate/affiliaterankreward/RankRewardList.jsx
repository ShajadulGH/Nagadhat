"use client";
import Image from "next/image";
import ClaimRewardModal from "./ClaimRewardModal";
import { useState } from "react";
import { NagadhatPublicUrl } from "@/app/utils";
import { FaCheckCircle } from "react-icons/fa";

const RankRewardList = ({ rankList, setStatusChange, statusChange }) => {
    const [selectedReward, setSelectedReward] = useState(null);

    const handleClaimReward = (item) => {
        setSelectedReward(item);
    };

    const handleCloseModal = () => {
        setSelectedReward(null);
    };

    return (
        <>
            <div className="table-responsive">
                <table
                    className="table table-hover"
                    style={{ minWidth: "950px" }}
                >
                    <thead>
                        <tr>
                            <th scope="col">Ranks</th>
                            <th scope="col" className="text-center">
                                Icon
                            </th>
                            <th scope="col" className="text-center">
                                Title
                            </th>
                            <th scope="col" className="text-center">
                                Total Sales
                            </th>
                            <th scope="col" className="text-center">
                                Direct Sales
                            </th>
                            <th scope="col" className="text-center">
                                1st Highest Sales
                            </th>
                            <th scope="col" className="text-center">
                                2nd Highest Sales
                            </th>
                            <th scope="col" className="text-center">
                                Others Sales
                            </th>
                            <th scope="col" className="text-center">
                                Rewards
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankList?.map((items, index) => (
                            <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle text-center">
                                    <Image
                                        src={`${NagadhatPublicUrl}/${items?.logo}`}
                                        width={40}
                                        height={40}
                                        alt={items?.level}
                                    />
                                </td>
                                <td className="align-middle text-center">
                                    {items?.level}
                                </td>
                                <td className="align-middle text-center">
                                    <div className="d-flex align-items-center">
                                        <span className="w-auto">
                                            {items?.user_total_sales || 0} |{" "}
                                            {items?.total_sales}
                                        </span>
                                        <span>
                                            {items?.user_total_sales >=
                                                items?.total_sales && (
                                                <FaCheckCircle className="praymary-color" />
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td className="align-middle text-center  ">
                                    <div className="d-flex align-items-center">
                                        <span>
                                            {items?.user_direct_sales || 0} |{" "}
                                            {items?.direct_sales}
                                        </span>
                                        <span>
                                            {items?.user_direct_sales >=
                                                items?.direct_sales && (
                                                <FaCheckCircle className="praymary-color" />
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <div className="d-flex align-items-center">
                                        <span>
                                            {items?.user_line_01_sales || 0} |{" "}
                                            {items?.line_01_sales}
                                        </span>
                                        <span>
                                            {items?.user_line_01_sales >=
                                                items?.line_01_sales && (
                                                <FaCheckCircle className="praymary-color" />
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <div className="d-flex align-items-center">
                                        <span>
                                            {items?.user_line_02_sales || 0} |{" "}
                                            {items?.line_02_sales}
                                        </span>
                                        <span>
                                            {index != 0 &&
                                                index != 1 &&
                                                items?.user_line_02_sales >=
                                                    items?.line_02_sales && (
                                                    <FaCheckCircle className="praymary-color" />
                                                )}
                                        </span>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <div className="d-flex align-items-center">
                                        <span>
                                            {items?.user_others_line || 0} |{" "}
                                            {items?.others_line}
                                        </span>
                                        <span>
                                            {items?.user_others_line >=
                                                items?.others_line && (
                                                <FaCheckCircle className="praymary-color" />
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <button
                                        onClick={() => {
                                            if (
                                                items?.status === 1 ||
                                                items?.status === 4
                                            ) {
                                                handleClaimReward(items);
                                            }
                                        }}
                                        className="add-to-cart-link affiliate-rank-btn text-capitalize"
                                        style={{
                                            background:
                                                items?.status === 0
                                                    ? "gray"
                                                    : items?.status === 2
                                                    ? "yellow"
                                                    : items?.status === 3
                                                    ? "#0089B9"
                                                    : "",
                                            color:
                                                items?.status === 3
                                                    ? "#fff"
                                                    : items?.status === 4
                                                    ? "#fff"
                                                    : items?.status === 2
                                                    ? "#000"
                                                    : "",
                                            cursor:
                                                items?.status === 1 ||
                                                items?.status === 4
                                                    ? "pointer"
                                                    : "auto",
                                        }}
                                    >
                                        {items?.status === 0 ? (
                                            "Rank Not Achieved"
                                        ) : items?.status === 1 ? (
                                            "Claim Reward"
                                        ) : items?.status === 2 ? (
                                            "Reward Claimed"
                                        ) : items?.status === 3 ? (
                                            <strong>Claim Approved</strong>
                                        ) : items?.status === 4 ? (
                                            "Claim Reward"
                                        ) : (
                                            ""
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedReward && (
                <ClaimRewardModal
                    setStatusChange={setStatusChange}
                    statusChange={statusChange}
                    show={!!selectedReward}
                    handleClose={handleCloseModal}
                    rewardDetails={selectedReward}
                />
            )}
        </>
    );
};

export default RankRewardList;
