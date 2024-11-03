import NoDataFound from "../NoDataFound";

const PayWithBankModalLeft = ({ bankList, isPending }) => {
    return (
        <>
            <div className="col-md-4 ">
                <div className="bg-body-secondary round-3">
                    <div className="modal-header">
                        <h6 className="modal-title fs-5">
                            Please Transfer your payment to this account
                        </h6>
                    </div>
                    {isPending ? (
                        <div className="text-center h-100 d-flex align-items-center justify-content-center py-5 ">
                            <h4>Loading...</h4>
                        </div>
                    ) : bankList && bankList.length > 0 ? (
                        bankList.map((item) => (
                            <ul
                                key={item.id}
                                className="modal-header flex-column justify-content-center align-items-start"
                            >
                                <li className="pb-1 fs-6">
                                    <strong>Bank Name: </strong>
                                    {item?.bank_name || "N/A"}
                                </li>
                                <li className="pb-1 fs-6">
                                    <strong>Account Name: </strong>
                                    {item?.account_name || "N/A"}
                                </li>
                                <li className="pb-1 fs-6">
                                    <strong>Account Number: </strong>
                                    {item?.account_number || "N/A"}
                                </li>
                                <li className="pb-1 fs-6">
                                    <strong>Routing Number: </strong>
                                    {item?.routing_number || "N/A"}
                                </li>
                                <li className="fs-6">
                                    <strong>Branch: </strong>
                                    {item.branch || "N/A"}
                                </li>
                            </ul>
                        ))
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            </div>
        </>
    );
};

export default PayWithBankModalLeft;
