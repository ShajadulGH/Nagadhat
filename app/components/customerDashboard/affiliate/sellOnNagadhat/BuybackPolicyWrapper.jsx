"use client";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import Link from "next/link";
import BuybackPolicyTopImage from "./BuybackPolicyTopImage";
import BuybackPolicyData from "./BuybackPolicyData";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { getSaleOnNagadhatOrderDetails } from "@/app/services/affiliate/getSaleOnNagadhatOrderDetails";
import LodingFixed from "@/app/components/LodingFixed";
import NoDataFound from "@/app/components/NoDataFound";

const BuybackPolicyWrapper = ({ params }) => {
    const saleOnId = params.proId;

    const [saleOnDetails, setSaleOnDetails] = useState();
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchSellOnNagadhatDetail = async () => {
                try {
                    startTransition(async () => {
                        const response = await getSaleOnNagadhatOrderDetails(
                            session.accessToken,
                            saleOnId
                        );
                        setSaleOnDetails(response?.results || []);
                    });
                } catch (error) {
                    console.error(
                        "Error fetching sell on Nagadhat Details:",
                        error
                    );
                }
            };
            fetchSellOnNagadhatDetail();
        }
    }, [status, session?.accessToken, saleOnId]);

    const hasSaleOnDetail =
        saleOnDetails && Object.keys(saleOnDetails).length > 0;

    return (
        <>
            <div className="customer-dashboard-order-history-area">
                <FinanceTopTitle title="Sell On Nagadhat" />
                {isPending ? (
                    <LodingFixed />
                ) : hasSaleOnDetail ? (
                    <>
                        <BuybackPolicyTopImage saleOnDetails={saleOnDetails} />
                        <BuybackPolicyData saleOnDetails={saleOnDetails} />
                    </>
                ) : (
                    <NoDataFound />
                )}

                <div
                    className="d-flex justify-content-end px-4 pb-5 pt-3"
                    style={{ borderTop: "1px solid #d8d8d8" }}
                >
                    <Link
                        href={`/affiliat-sell-on-nagadhat`}
                        className="btn btn-danger"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BuybackPolicyWrapper;
