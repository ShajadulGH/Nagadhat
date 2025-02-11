import { BsBank2 } from "react-icons/bs";
import { FaSignature } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaSortNumericUp } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { getBankLists } from "@/app/services/bank/getBankLists";
import NoDataFound from "../../NoDataFound";

const CompanyBankInfoLeft = async () => {
    const bankList = await getBankLists();
    const bankListData = bankList?.results?.banks || [];

    return (
        <>
            <div className="col-md-7">
                {bankListData?.map((bank, index) => (
                    <div key={bank.id} className={index && "mt-3 border-top pt-3"}>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <BsBank2 className="fs-5" />{" "}
                            <strong className="pt-1"> Bank Name:</strong>{" "}
                            <span className="pt-1">
                                {bank?.bank_name}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaSignature className="fs-5" />{" "}
                            <strong className="pt-1"> Account Name:</strong>{" "}
                            <span className="pt-1">
                                {bank?.account_name}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaMoneyCheckDollar className="fs-5" />{" "}
                            <strong className="pt-1"> Account Number:</strong>{" "}
                            <span className="pt-1">
                                {bank?.account_number}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaSortNumericUp className="fs-5" />{" "}
                            <strong className="pt-1"> Routing Number:</strong>{" "}
                            <span className="pt-1">
                                {bank?.routing_number}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaDonate className="fs-5" />{" "}
                            <strong className="pt-1"> Branch:</strong>{" "}
                            <span className="pt-1">
                                {bank?.branch}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CompanyBankInfoLeft;
