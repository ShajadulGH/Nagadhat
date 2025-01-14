"use client";
import { useSession } from "next-auth/react";
import SaleOnNagadhatDetailBottom from "./SaleOnNagadhatDetailBottom";
import SaleOnNagadhatDetailHeader from "./SaleOnNagadhatDetailHeader";
import SaleOnNagadhatDetailInvoice from "./SaleOnNagadhatDetailInvoice";
import SaleOnNagadhatDetailNomini from "./SaleOnNagadhatDetailNomini";
import SaleOnNagadhatDetailPay from "./SaleOnNagadhatDetailPay";
import SaleOnNagadhatDetailTop from "./SaleOnNagadhatDetailTop";
import { getSaleOnNagadhat } from "@/app/services/affiliate/getSaleOnNagadhat";
import { useEffect, useState, useTransition } from "react";
import LodingFixed from "@/app/components/LodingFixed";
import NoDataFound from "@/app/components/NoDataFound";

const SellOnNgadhatDetailWrapp = ({ orderId }) => {
    const [isPending, startTransition] = useTransition();
    const [saleOnNagadhatData, setSaleOnNagadhatData] = useState({});
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchSaleOnNagadhatData = async () => {
                try {
                    startTransition(async () => {
                        const response = await getSaleOnNagadhat(
                            orderId,
                            session?.accessToken
                        );

                        setSaleOnNagadhatData(response?.results || {});
                    });
                } catch (error) {}
            };
            fetchSaleOnNagadhatData();
        }
    }, [status, session?.accessToken, orderId]);

    const saleOnLength =
        saleOnNagadhatData && Object.keys(saleOnNagadhatData).length > 0;
    
    const headalePrint = () => {
     
        const printContents = document.querySelector(
            ".customer-dashboard-order-history-area"
        ).innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <>
            <div className="customer-dashboard-order-history-area main-sale-on-sections">
                <SaleOnNagadhatDetailHeader />
                {isPending ? (
                    <LodingFixed />
                ) : saleOnLength ? (
                    <>
                        <SaleOnNagadhatDetailTop
                            saleOnNagadhatData={saleOnNagadhatData}
                        />
                        <SaleOnNagadhatDetailInvoice
                            saleOnNagadhatData={saleOnNagadhatData}
                        />
                        <SaleOnNagadhatDetailPay
                            saleOnNagadhatData={saleOnNagadhatData}
                        />
                        <SaleOnNagadhatDetailNomini
                            saleOnNagadhatData={saleOnNagadhatData}
                        />
                        <SaleOnNagadhatDetailBottom
                            saleOnNagadhatData={saleOnNagadhatData}
                            headalePrint={headalePrint}
                        />
                    </>
                ) : (
                    <NoDataFound />
                )}
            </div>
        </>
    );
};

export default SellOnNgadhatDetailWrapp;
