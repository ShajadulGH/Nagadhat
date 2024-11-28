import NoDataFound from "../../NoDataFound";

const WalletStatementData = ({ statementData }) => {
    return (
        <>
            <div className="px-4 py-4">
                <div className="table-responsive">
                    <table className="table" style={{ minWidth: "720px" }}>
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Date/Time</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Debit</th>
                                <th scope="col">Credit</th>
                                <th scope="col">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statementData?.length > 0 ? (
                                statementData?.map((item, index) => {
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
                                            <td>{index + 1}</td>
                                            <td>
                                                {date} / {time}
                                            </td>
                                            <td>{purpose}</td>
                                            <td>
                                                ৳{" "}
                                                {transaction_type === "Debit"
                                                    ? amount.toFixed(2)
                                                    : 0}
                                            </td>
                                            <td>
                                                ৳{" "}
                                                {transaction_type === "Credit"
                                                    ? amount.toFixed(2)
                                                    : 0}
                                            </td>
                                            <td>
                                                ৳{" "}
                                                {balance
                                                    ? balance.toFixed(2)
                                                    : 0}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <NoDataFound
                                    title={`Wallet Statement Data Not Found`}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-4 py-2 pb-4">
                <h3>Pagination...</h3>
            </div>
        </>
    );
};

export default WalletStatementData;
