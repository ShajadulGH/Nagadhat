import agent from "@/public/images/agent.png";
import mobileBanking from "@/public/images/mobile-banking.png";
import bank from "@/public/images/bank.png";
import Image from "next/image";

const FinancePaymentMethod = ({financeAgentInfo}) => {
    return (
        <>
            <div className="p-3 pb-0">
                <div className="row row-cols-3">
                    {financeAgentInfo?.can_agent_withdraw ? (
                        <div className="p-0" type="button" data-bs-toggle="modal" data-bs-target="#agentModel">
                            <Image height={200} width={500} src={agent} className="img-fluid" alt="Agent Withdrawal" />
                        </div>
                    ):''}
                    {financeAgentInfo?.can_mobile_withdraw ? (
                        <div className=" p-0" type="button" data-bs-toggle="modal" data-bs-target="#mobileBankingModal">
                            <Image height={200} width={500} src={mobileBanking} className="img-fluid" alt="Mobile Banking Withdrawal" />
                        </div>
                    ):''}
                    {financeAgentInfo?.can_bank_withdraw ? (
                        <div className=" p-0" type="button" data-bs-toggle="modal" data-bs-target="#bankModal">
                            <Image height={200} width={500} src={bank} className="img-fluid" alt="Bank Withdrawal" />
                        </div>
                    ):''}
                </div>
            </div>
        </>
    )
}

export default FinancePaymentMethod
