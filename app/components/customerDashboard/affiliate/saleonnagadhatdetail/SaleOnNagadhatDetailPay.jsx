import NoDataFound from "@/app/components/NoDataFound";

const SaleOnNagadhatDetailPay = ({ saleOnNagadhatData }) => {
    return (
        <>
            <div className="saleon-nagadhat-detail-pay text-center p-4 pt-0 digitale-market-table">
                <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-6 font-width-medium rounded-4 ">
                    নগদহাট ডিজিটাল মার্কেট প্লেসে বিক্রিতব্য/বিক্রয়কৃত পণ্যের
                    টাকা প্রদানের সম্ভাব্য তারিখ ও টাকার বিবরণ
                </h1>
                <div className="table-responsive">
                    <table className="table table-striped border-secondary table-bordered" style={{ minWidth:"700px" }}>
                        <thead>
                            <tr>
                                <th scope="col fs-6">SL</th>
                                <th scope="col fs-6" style={{width: "170px"}}>Date</th>
                                <th scope="col fs-6">
                                    Depositing Amount in the Personal Wallet
                                </th>
                                <th scope="col fs-6">
                                    Payable Amount (After deducting 10% Service
                                    Charge)
                                </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleOnNagadhatData?.payment_history &&
                            saleOnNagadhatData?.payment_history?.length > 0 ? (
                                saleOnNagadhatData?.payment_history.map(
                                    (item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {item?.date_time || "N/A"}
                                                </td>
                                                <td>
                                                ৳ {item?.transaction_amount
                                                        ? item.transaction_amount.toFixed(
                                                              2
                                                          )
                                                        : "0"}
                                                </td>
                                                <td>
                                                ৳ {item?.payable.toFixed(2) ||
                                                        "0"}
                                                </td>
                                                <td> {item?.payment_status}</td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <NoDataFound />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailPay;
