"use client";
import dynamic from "next/dynamic";
const PayNowPaymentOption = dynamic(() => import("./PayNowPaymentOption"), {
    ssr: false,
});

import PayNowSummary from "./PayNowSummary";
import { useState, useTransition } from "react";

const PayNowDetails = () => {
    const [orderSummary, setOrderSummary] = useState({});
    const [isPending, startTransition] = useTransition();
    return (
        <>
            <div className="row pay-now-payment-option-area">
                <PayNowPaymentOption
                    orderSummary={orderSummary}
                    isPending={isPending}
                />
                <PayNowSummary
                    orderSummary={orderSummary}
                    setOrderSummary={setOrderSummary}
                    startTransition={startTransition}
                />
            </div>
        </>
    );
};

export default PayNowDetails;
