"use client";
import { FaEye } from "react-icons/fa6";
import WithdrawHistoryModal from "./WithdrawHistoryModal";
import { useState } from "react";

const WithdrawHistoryBtn = ({ item, token }) => {
    const [selectedId, setSelectedId] = useState(null);
    const modalId = `viewWithdrawHistoryModal-${item?.id}`;
    return (
        <>
            <td className="text-center align-middle">
                <div className="customer-dashboard-order-history-actions justify-content-center">
                    <button
                        type="button"
                        className="border-0"
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalId}`}
                        onClick={() => setSelectedId(item?.id)}
                    >
                        <FaEye />
                    </button>
                </div>
                <WithdrawHistoryModal selectedId={selectedId} token={token}  modalId={modalId}  />
            </td>

        </>
    );
};

export default WithdrawHistoryBtn;
