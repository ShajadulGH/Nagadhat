"use client";
import dynamic from "next/dynamic";
import PayWithBankModalLeft from "./PayWithBankModalLeft";
import { useEffect, useState, useTransition } from "react";
import { getBankLists } from "@/app/services/bank/getBankLists";
const PayWithBankModalTop = dynamic(() => import("./PayWithBankModalTop"), {
    ssr: false,
});
const PayWithBankModalRight = dynamic(() => import("./PayWithBankModalRight"), {
    ssr: false,
});

const PayWithBankModal = ({
    setShowBankModal,
    showBankModal,
    orderSummary,
}) => {
    const [isPending, startTransition] = useTransition();
    const [bankList, setBankList] = useState([]);

    useEffect(() => {
        const fetchBankList = async () => {
            try {
                startTransition(async () => {
                    const response = await getBankLists();
                    setBankList(response?.results?.banks || []);
                });
            } catch (error) {
                console.error("", error);
            }
        };
        fetchBankList();
    }, []);

    return (
        <>
            <div
                className={`modal fade ${showBankModal ? "show" : ""}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: showBankModal ? "block" : "none" }}
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <PayWithBankModalTop
                            setShowBankModal={setShowBankModal}
                        />
                        <div className="modal-body">
                            <div className="row">
                                <PayWithBankModalLeft
                                    bankList={bankList}
                                    isPending={isPending}
                                />
                                <PayWithBankModalRight
                                    orderSummary={orderSummary}
                                    bankList={bankList}
                                    setShowBankModal={setShowBankModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayWithBankModal;
