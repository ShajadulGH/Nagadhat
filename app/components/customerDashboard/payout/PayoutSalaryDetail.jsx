const PayoutSalaryDetail = ({ salaryList, salaryResult, serialNumber }) => {
    return (
        <>
            <div className="table-responsive px-md-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col" className="d-none d-md-table-cell">Date/Time</th>
                            <th scope="col" className="d-md-none">Particular</th>
                            <th scope="col">Rank</th>
                            <th scope="col" className="d-none d-md-table-cell">Purpose</th>
                            <th scope="col " className="text-end">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salaryList?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1 + serialNumber}</td>
                                        <td className="d-none d-md-table-cell">{item?.date_time}</td>
                                        <td className="d-md-none">{item?.date_time}, <br /> {item?.purpose}</td>
                                        <td>{item?.rank}</td>
                                        <td className="d-none d-md-table-cell">{item?.purpose}</td>
                                        <td className="text-end">৳{item?.balance}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-end fs-5 ">
                                Total: ৳ {salaryResult?.total_salary.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default PayoutSalaryDetail;
