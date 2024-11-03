"use client";
import Image from "next/image";
import ClaimRewardModal from "./ClaimRewardModal";
import { useState } from "react";

const RankRewardList = ({ rankList, setStatusChange }) => {
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
                <table className="table table-hover">
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
                        {rankList &&
                            rankList.length > 0 &&
                            rankList.map((items, index) => (
                                <tr key={index}>
                                    <td className="align-middle">
                                        {index + 1}
                                    </td>
                                    <td className="align-middle text-center">
                                        <Image
                                            src="/images/men (1).png"
                                            width={40}
                                            height={40}
                                            alt="men (1).png"
                                        />
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.level}
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.user_total_sales || 0} |{" "}
                                        {items?.total_sales}
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.user_direct_sales || 0} |{" "}
                                        {items?.direct_sales}
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.user_line_01_sales || 0} |{" "}
                                        {items?.line_01_sales}
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.user_line_02_sales || 0} |{" "}
                                        {items?.line_02_sales}
                                    </td>
                                    <td className="align-middle text-center">
                                        {items?.user_others_line || 0} |{" "}
                                        {items?.others_line}
                                    </td>
                                    <td className="align-middle text-center">
                                        <button
                                            onClick={() =>
                                                handleClaimReward(items)
                                            }
                                            className="add-to-cart-link affiliate-rank-btn text-capitalize"
                                            style={{
                                                background:
                                                    items?.status === 0
                                                        ? "gray"
                                                        : items?.status === 3
                                                        ? "#D3D3D3"
                                                        : "",
                                                color:
                                                    items?.status === 3
                                                        ? "#000"
                                                        : "",
                                            }}
                                        >
                                            {items?.status === 0
                                                ? "Rank Not Achieved"
                                                : items?.status === 1
                                                ? "Claim Reward"
                                                : items?.status === 2
                                                ? "Reward Claimed"
                                                : items?.status === 3
                                                ? "Claim Approved"
                                                : ""}
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
                    show={!!selectedReward}
                    handleClose={handleCloseModal}
                    rewardDetails={selectedReward}
                />
            )}
        </>
    );
};

export default RankRewardList;
