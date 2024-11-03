"use client"
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import FinanceHistoryModal from "./FinanceHistoryModal";

const FinanceHistoryBtn = ({ transaction }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleOpenModal = () => {
        setSelectedTransaction(transaction);
    };

    return (
        <>
            <div
                onClick={handleOpenModal}
                className="customer-dashboard-order-history-actions justify-content-center text-center"
            >
                <button
                    type="button"
                    className="border-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#viewWithdrawHistoryModal-${transaction.id}`} // Unique ID for each modal
                >
                    <FaEye />
                </button>
            </div>

            <FinanceHistoryModal
                transaction={selectedTransaction}
                modalId={`viewWithdrawHistoryModal-${transaction.id}`}
            />
        </>
    );
};

export default FinanceHistoryBtn;
