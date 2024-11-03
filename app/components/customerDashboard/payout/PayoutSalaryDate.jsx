const PayoutSalaryDate = ({ salaryResult }) => {
    return (
        <>
            <div className="row pb-2 row-gap-2 px-3">
                <div className="col-md-4">
                    <div className="px-3 rounded py-2 border">
                        <p>
                            Activity Date:{" "}
                            <strong>{salaryResult?.start_date}</strong>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="px-3 rounded py-2 border">
                        <p>
                            End Date: <strong>{salaryResult?.end_date}</strong>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="px-3 rounded py-2 border">
                        <p>
                            Next Salary:{" "}
                            <strong> ৳ {salaryResult?.next_salary} </strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayoutSalaryDate;
