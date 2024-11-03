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
    const firstBankDetails = bankListData.length > 0 ? bankListData[1] : null;
    console.log({ firstBankDetails });

    return (
        <>
            <div className="col-md-7">
                {firstBankDetails ? (
                    <div className="">
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <BsBank2 className="fs-5" />{" "}
                            <strong className="pt-1"> Bank Name:</strong>{" "}
                            <span className="pt-1">
                                {firstBankDetails?.bank_name}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaSignature className="fs-5" />{" "}
                            <strong className="pt-1"> Account Name:</strong>{" "}
                            <span className="pt-1">
                                {firstBankDetails?.account_name}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaMoneyCheckDollar className="fs-5" />{" "}
                            <strong className="pt-1"> Account Number:</strong>{" "}
                            <span className="pt-1">
                                {firstBankDetails?.account_number}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaSortNumericUp className="fs-5" />{" "}
                            <strong className="pt-1"> Routing Number:</strong>{" "}
                            <span className="pt-1">
                                {firstBankDetails?.routing_number}
                            </span>
                        </p>
                        <p className=" pb-2 d-flex align-items-center gap-2 fs-6">
                            <FaDonate className="fs-5" />{" "}
                            <strong className="pt-1"> Branch:</strong>{" "}
                            <span className="pt-1">
                                {firstBankDetails?.branch}
                            </span>
                        </p>
                    </div>
                ) : (
                    <NoDataFound />
                )}
            </div>
        </>
    );
};

export default CompanyBankInfoLeft;
