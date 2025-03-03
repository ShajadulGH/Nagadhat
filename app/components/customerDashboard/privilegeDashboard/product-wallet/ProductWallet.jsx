import NoDataFound from "@/app/components/NoDataFound";
import Pagination from "@/app/components/productCategory/Pagination";

const ProductWallet = ({ lastPage, currentPage, statementData }) => {


    return (
        <div className="px-4 py-4">
            <div className="table-responsive">
                {statementData?.length > 0 ? (
                    <table className="table" style={{ minWidth: "720px" }}>
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">
                                    SL
                                </th>
                                <th scope="col" className="text-center">
                                    Date/Time
                                </th>
                                <th scope="col" className="text-center">
                                    Purpose
                                </th>
                                <th scope="col" className="text-end">
                                    Debit
                                </th>
                                <th scope="col" className="text-end">
                                    Credit
                                </th>
                                <th scope="col" className="text-end">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {statementData?.map((item, index) => {
                                const {
                                    id,
                                    date,
                                    time,
                                    transaction_type,
                                    purpose,
                                    amount,
                                    balance,
                                } = item;

                                return (
                                    <tr key={id}>
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td className="text-center">
                                            {date} / {time}
                                        </td>
                                        <td className="text-center">
                                            {purpose}
                                        </td>
                                        <td className="text-end">
                                            ৳{" "}
                                            {transaction_type === "Debit"
                                                ? amount.toFixed(2)
                                                : 0}
                                        </td>
                                        <td className="text-end">
                                            ৳{" "}
                                            {transaction_type === "Credit"
                                                ? amount.toFixed(2)
                                                : 0}
                                        </td>
                                        <td className="text-end">
                                            ৳ {balance ? balance.toFixed(2) : 0}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <NoDataFound title={`Product Wallet  Data Not Found`} />
                )}
                <Pagination currentPage={currentPage} lastPage={lastPage} />
            </div>
        </div>
    );
};

export default ProductWallet;
