'use client';
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { postExecutePaymentWithBkash } from "../services/placeorder/postExecutePaymentWithBkash";
import { toast, ToastContainer } from "react-toastify";
import DefaultLoader from "../components/defaultloader/DefaultLoader";
import { postCancelPaymentWithBkash } from "../services/placeorder/postCancelPaymentWithBkash";

const BkashCallBack = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const paymentID = searchParams.get('paymentID');
    const orderID = searchParams.get('orderId');
    const status = searchParams.get('status');

    useEffect(() => {
        const processPayment = async () => {
            if (status === 'success' && paymentID) {
                // Post payment data to server
                const paymentData = await postExecutePaymentWithBkash(paymentID);
                // Redirect to the thank you page with the orderId
                router.push(`/thankyou?orderId=${orderID}`);
            } else {
                toast.error("Payment failed, try again")
                const data = { orderID, paymentID }
                const paymentCancel = await postCancelPaymentWithBkash(data);
                console.log(paymentCancel);
                router.push(`/paynow?orderId=${orderID}`); // Redirect to the home page if payment failed or ID is missing
            }
        };

        processPayment();
    }, [paymentID, status, router]);

    return (
        <>
            <ToastContainer />
            <DefaultLoader />
        </>
    );
};

export default BkashCallBack;
