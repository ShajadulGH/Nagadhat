"use client";

import FinanceTopTitle from "./FinanceTopTitle";
import FinancePaymentMethod from "./FinancePaymentMethod";
import AgentWithdrawalModal from "./AgentWithdrawalModal";
import MobileBankingModal from "./MobileBankingModal";
import BankWithdrawalModal from "./BankWithdrawalModal";
import WithdrawTopBanner from "./WithdrawTopBanner";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { getFinanceMobileBankingInfo } from "@/app/services/affiliate-finance/getFinanceMobileBankingInfo";
import { getFinanceBankTransferInfo } from "@/app/services/affiliate-finance/getFinanceBankTransferInfo";
import { getAffiliateFinanceAgents } from "@/app/services/affiliate-finance/getAffiliateFinanceAgents";
import LastFiveWithdrawHistory from "./LastFiveWithdrawHistory";
import { ToastContainer } from "react-toastify";

const WithdrawWrapper = () => {
    const [isPending, startTransition] = useTransition();
    const [mobileBankingInfo, setMobileBankingInfo] = useState({});
    const [bankTransferInfo, setBankTransferInfo] = useState({});
    const [financeAgentInfo, setFinanceAgentInfo] = useState({});

    const { data: session, status } = useSession();

    // function for mobileBankingInfo
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchMobileBanking = async () => {
                try {
                    startTransition(async () => {
                        const response = await getFinanceMobileBankingInfo(
                            session?.accessToken
                        );
                        setMobileBankingInfo(response?.results);
                    });
                } catch (error) {
                    console.error("Error fetching mobile banking data", error);
                }
            };
            fetchMobileBanking();
        }
    }, [status, session?.accessToken]);

    // function for BankTransferInfo
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchBankInfo = async () => {
                try {
                    startTransition(async () => {
                        const response = await getFinanceBankTransferInfo(
                            session?.accessToken
                        );
                        setBankTransferInfo(response?.results || {});
                    });
                } catch (error) {
                    console.error("Error fetching bank transfer data", error);
                }
            };
            fetchBankInfo();
        }
    }, [status, session?.accessToken]);

    // function for FinanceAgentInfo
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchFinanceAgents = async () => {
                try {
                    startTransition(async () => {
                        const response = await getAffiliateFinanceAgents(
                            session?.accessToken
                        );
                        setFinanceAgentInfo(response?.results || {});
                    });
                } catch (error) {
                    console.error("Error fetching Finance Agent data", error);
                }
            };
            fetchFinanceAgents();
        }
    }, [status, session?.accessToken]);

    const mobileBankingList = mobileBankingInfo?.data;

    return (
        <>
            <div className="customer-dashboard-order-history-area">
                <ToastContainer/>
                <FinanceTopTitle title="Withdraw" />
                <div className="p-4">
                    {/* withdraw top banner section */}
                    <WithdrawTopBanner />

                    {/* Withdrawal Payment Method*/}
                    <FinancePaymentMethod />

                    {/* Modal 1: Agent Withdrawal */}
                    <AgentWithdrawalModal
                        financeAgentInfo={financeAgentInfo}
                        mobileBankingList={mobileBankingList}
                        bankTransferData={bankTransferInfo}
                    />

                    {/* Modal 2: Mobile Banking */}
                    <MobileBankingModal
                        mobileBankingInfo={mobileBankingInfo}
                        financeAgentInfo={financeAgentInfo}
                    />

                    {/* Modal 3: Bank */}
                    <BankWithdrawalModal bankTransferInfo={bankTransferInfo} />
                    <LastFiveWithdrawHistory />
                </div>
            </div>
        </>
    );
};

export default WithdrawWrapper;
