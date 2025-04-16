"use client";
import Image from "next/image";
import ClaimRewardModal from "./ClaimRewardModal";
import { NagadhatPublicUrl } from "@/app/utils";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

const RankRewardList = ({
    rankList,
    setStatusChange,
    statusChange,
    lavelList,
}) => {
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
                            <th scope="col" className="text-center">
                                Icon
                            </th>
                            <th scope="col" className="text-center">
                                Title
                            </th>
                            {(lavelList[0] === "Executive" ||
                                lavelList[1] === "Senior Executive" ||
                                lavelList[2] === "Area Manager") && (
                                <th scope="col" className="text-center">
                                    Personal Sales
                                </th>
                            )}

                            <th scope="col" className="text-center">
                                1st Sales Team
                            </th>
                            <th scope="col" className="text-center">
                                2nd Sales Team
                            </th>
                            <th scope="col" className="text-center">
                                3rd Sales Team
                            </th>
                            <th scope="col" className="text-center">
                                Rewards
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankList?.map((items, index) => {
                            console.log("items===>", items);
                            if (items?.status !== 3) {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle text-center">
                                            <Image
                                                src={`${NagadhatPublicUrl}/${items?.next_target_rank?.logo}`}
                                                width={40}
                                                height={40}
                                                alt={
                                                    items?.next_target_rank
                                                        ?.level
                                                }
                                            />
                                        </td>
                                        <td className="align-middle text-center">
                                            {items?.next_target_rank?.level}
                                        </td>
                                        {(lavelList[0] === "Executive" ||
                                            lavelList[1] ===
                                                "Senior Executive" ||
                                            lavelList[2] ===
                                                "Area Manager") && (
                                            <td className="align-middle text-center  ">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span>
                                                        {items?.user_direct_sales ||
                                                            0}{" "}
                                                        | {items?.direct_sales}
                                                    </span>
                                                    <span>
                                                        {items?.user_direct_sales >=
                                                            items?.direct_sales && (
                                                            <FaCheckCircle className="praymary-color" />
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                        )}

                                        <td className="align-middle text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>
                                                    {items?.next_target_rank?.user_next_line_01_sales}{" "}
                                                    | {items?.next_target_rank?.next_target_line_01_sales}
                                                </span>
                                                {/* <span>
                                                    {items?.user_line_01_sales >=
                                                        items?.line_01_sales && (
                                                        <FaCheckCircle className="praymary-color" />
                                                    )}
                                                </span> */}
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                            <span>
                                                {items?.next_target_rank?.user_next_line_02_sales}{" "}
                                                | {items?.next_target_rank?.next_target_line_02_sales}
                                            </span>
                                                {/* <span>
                                                    {index != 0 &&
                                                        index != 1 &&
                                                        items?.user_line_02_sales >=
                                                            items?.line_02_sales && (
                                                            <FaCheckCircle className="praymary-color" />
                                                        )}
                                                </span> */}
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                            <span>
                                                {items?.next_target_rank?.user_next_others_line}{" "}
                                                | {items?.next_target_rank?.next_target_others_line}
                                            </span>
                                                {/* <span>
                                                    {items?.user_others_line >=
                                                        items?.others_line && (
                                                        <FaCheckCircle className="praymary-color" />
                                                    )}
                                                </span> */}
                                            </div>
                                        </td>
                                        <td className="align-middle text-center ">
                                            <button
                                                onClick={() => {
                                                    if (
                                                        items?.status === 0 ||
                                                        items?.status === 1 ||
                                                        items?.status === 4
                                                    ) {
                                                        handleClaimReward(
                                                            items
                                                        );
                                                    }
                                                }}
                                                className="add-to-cart-link affiliate-rank-btn text-capitalize text-center d-inline-block"
                                                style={{
                                                    background:
                                                        items?.status === 0
                                                            ? "gray"
                                                            : items?.status ===
                                                              2
                                                            ? "yellow"
                                                            : items?.status ===
                                                              3
                                                            ? "#0089B9"
                                                            : "",
                                                    color:
                                                        items?.status === 3
                                                            ? "#fff"
                                                            : items?.status ===
                                                              4
                                                            ? "#fff"
                                                            : items?.status ===
                                                              2
                                                            ? "#000"
                                                            : "",
                                                    cursor:
                                                        items?.status === 0 ||
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
                                                    <strong>
                                                        Claim Approved
                                                    </strong>
                                                ) : items?.status === 4 ? (
                                                    "Claim Reward"
                                                ) : (
                                                    ""
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={index}>
                                    <td className="align-middle text-center">
                                        <Image
                                            src={`${NagadhatPublicUrl}/${items?.next_target_rank?.logo}`}
                                            width={40}
                                            height={40}
                                            alt={
                                                items?.next_target_rank
                                                    ?.level
                                            }
                                        />
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.next_target_rank?.level}
                                    </td>
                                    {(lavelList[0] === "Executive" ||
                                        lavelList[1] ===
                                            "Senior Executive" ||
                                        lavelList[2] ===
                                            "Area Manager") && (
                                        <td className="align-middle text-center  ">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>
                                                    {items?.user_direct_sales ||
                                                        0}{" "}
                                                    | {items?.direct_sales}
                                                </span>
                                                <span>
                                                    {items?.user_direct_sales >=
                                                        items?.direct_sales && (
                                                        <FaCheckCircle className="praymary-color" />
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                    )}

                                    <td className="align-middle text-center">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span>
                                                {items?.next_target_rank?.user_next_line_01_sales}{" "}
                                                | {items?.next_target_rank?.next_target_line_01_sales}
                                            </span>
                                            {/* <span>
                                                {items?.user_line_01_sales >=
                                                    items?.line_01_sales && (
                                                    <FaCheckCircle className="praymary-color" />
                                                )}
                                            </span> */}
                                        </div>
                                    </td>
                                    <td className="align-middle text-center">
                                        <div className="d-flex align-items-center justify-content-center">
                                        <span>
                                            {items?.next_target_rank?.user_next_line_02_sales}{" "}
                                            | {items?.next_target_rank?.next_target_line_02_sales}
                                        </span>
                                            {/* <span>
                                                {index != 0 &&
                                                    index != 1 &&
                                                    items?.user_line_02_sales >=
                                                        items?.line_02_sales && (
                                                        <FaCheckCircle className="praymary-color" />
                                                    )}
                                            </span> */}
                                        </div>
                                    </td>
                                    <td className="align-middle text-center">
                                        <div className="d-flex align-items-center justify-content-center">
                                        <span>
                                            {items?.next_target_rank?.user_next_others_line}{" "}
                                            | {items?.next_target_rank?.next_target_others_line}
                                        </span>
                                            {/* <span>
                                                {items?.user_others_line >=
                                                    items?.others_line && (
                                                    <FaCheckCircle className="praymary-color" />
                                                )}
                                            </span> */}
                                        </div>
                                    </td>
                                    <td className="align-middle text-center ">
                                        <button
                                            onClick={() => {
                                                if (
                                                    items?.status === 0 ||
                                                    items?.status === 1 ||
                                                    items?.status === 4
                                                ) {
                                                    handleClaimReward(
                                                        items
                                                    );
                                                }
                                            }}
                                            className="add-to-cart-link affiliate-rank-btn text-capitalize text-center d-inline-block"
                                            style={{
                                                background:
                                                    items?.status === 0
                                                        ? "gray"
                                                        : items?.status ===
                                                            2
                                                        ? "yellow"
                                                        : items?.status ===
                                                            3
                                                        ? "#0089B9"
                                                        : "",
                                                color:
                                                    items?.status === 3
                                                        ? "#fff"
                                                        : items?.status ===
                                                            4
                                                        ? "#fff"
                                                        : items?.status ===
                                                            2
                                                        ? "#000"
                                                        : "",
                                                cursor:
                                                    items?.status === 0 ||
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
                                                <strong>
                                                    Claim Approved
                                                </strong>
                                            ) : items?.status === 4 ? (
                                                "Claim Reward"
                                            ) : (
                                                ""
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
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
