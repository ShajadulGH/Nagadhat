"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const DownloadInvoiceBtn = ({ orderSummary }) => {
    const router = useRouter();
    const handlePrintInvoice = (e) => {
        e.preventDefault();
        router.push(`/orderinvoice?orderId=${orderSummary?.order_id}`);
    };
    return (
        <>
            <Link
                href={`/orderinvoice?orderId=${orderSummary?.order_id}`}
                onClick={handlePrintInvoice}
                className="add-to-cart-link border-0 rounded-2"
            >
                Download Invoice
            </Link>
        </>
    );
};

export default DownloadInvoiceBtn;
