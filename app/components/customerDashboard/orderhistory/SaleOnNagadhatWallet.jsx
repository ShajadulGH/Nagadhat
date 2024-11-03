import NoDataFound from "../../NoDataFound";

const SaleOnNagadhatWallet = ({ saleOnNagadhatData }) => {
    return (
        <>
            <div className=" text-center pb-4">
                <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-6 font-width-medium rounded-4 ">
                    নগদহাট ডিজিটাল মার্কেট প্লেসে বিক্রিতব্য/বিক্রয়কৃত পণ্যের
                    টাকা প্রদানের সম্ভাব্য তারিখ ও টাকার বিবরণ
                </h1>
                <div className="table-responsive">
                    <table className="table table-striped border-secondary table-bordered">
                        <thead>
                            <tr>
                                <th scope="col fs-6">SL</th>
                                <th scope="col fs-6">Date</th>
                                <th scope="col fs-6">
                                    Depositing Amount in the Personal Wallet
                                </th>
                                <th scope="col fs-6">
                                    Payable Amount (After deducting 10% Service
                                    Charge)
                                </th>
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
                                                    {item?.transaction_amount ||
                                                        "N/A"}
                                                </td>
                                                <td>
                                                    {item?.payable || "N/A"}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : (
                                <tr>
                                    <td colSpan={4}>
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

export default SaleOnNagadhatWallet;
