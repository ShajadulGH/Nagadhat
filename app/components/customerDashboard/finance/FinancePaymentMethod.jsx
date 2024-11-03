import agent from "@/public/images/agent.png";
import mobileBanking from "@/public/images/mobile-banking.png";
import bank from "@/public/images/bank.png";
import Image from "next/image";

const FinancePaymentMethod = () => {
    return (
        <>
            <div className="p-3">
                <div className="row">
                    <div className="col-sm-4 p-0" type="button" data-bs-toggle="modal" data-bs-target="#agentModel">
                        <Image height={200} width={300} src={agent} className="img-fluid" alt="Agent Withdrawal" />
                    </div>
                    <div className="col-sm-4 p-0" type="button" data-bs-toggle="modal" data-bs-target="#mobileBankingModal">
                        <Image src={mobileBanking} height={200} width={300} className="img-fluid" alt="Mobile Banking Withdrawal" />
                    </div>
                    <div className="col-sm-4 p-0" type="button" data-bs-toggle="modal" data-bs-target="#bankModal">
                        <Image src={bank} height={200} width={300} alt="Bank Withdrawal" className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FinancePaymentMethod
