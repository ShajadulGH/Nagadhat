const PayoutSalaryDetail = ({ salaryList, salaryResult }) => {
    return (
        <>
            <div className="table-responsive px-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Rank</th>
                            <th scope="col">Purpose</th>
                            <th scope="col " className="text-end">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaryList &&
                            salaryList?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.date_time}</td>
                                        <td>{item?.rank}</td>
                                        <td>{item?.purpose}</td>
                                        <td className="text-end">
                                            ৳ {item?.balance}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-end fs-5 ">
                                Total: ৳ {salaryResult?.total_salary}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default PayoutSalaryDetail;
