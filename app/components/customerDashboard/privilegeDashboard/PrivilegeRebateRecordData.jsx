import NoDataFound from "../../NoDataFound";

const PrivilegeRebateRecordData = ({ rebateRecordData }) => {
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
                                <th scope="col">Amount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rebateRecordData?.length > 0 ? (
                                rebateRecordData?.map((item, index) => {
                                    const { id, created_at, amount, note } =
                                        item;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{created_at}</td>
                                            <td>{note}</td>
                                            <td>৳ {amount.toFixed(2)}</td>
                                            <td>----</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <NoDataFound
                                    title={`Rebate History Data Not Found`}
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

export default PrivilegeRebateRecordData;
