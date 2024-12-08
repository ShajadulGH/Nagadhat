import NoDataFound from "../../NoDataFound";
import Pagination from "../../productCategory/Pagination";

const PrivilegeRebateRecordData = ({ rebateRecordData, currentPage, lastPage }) => {
    return (
        <>
            <div className="px-4 py-4">
                <div className="table-responsive">
                    {rebateRecordData?.length > 0 ? (
                        <table className="table" style={{ minWidth: "720px" }}>
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Purpose</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rebateRecordData?.map((item, index) => {
                                        const { id, date, amount, note } = item;
                                        return (
                                            <tr key={id}>
                                                <td>{index + 1}</td>
                                                <td>{date}</td>
                                                <td>{note}</td>
                                                <td>৳ {amount.toFixed(2)}</td>
                                                <td>----</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <NoDataFound
                            title={`Rebate History Data Not Found`}
                        />
                    )}
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                    />
                </div>
            </div>
        </>
    );
};

export default PrivilegeRebateRecordData;
