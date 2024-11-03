import moment from "moment";

const FinanceHistoryModal = ({ transaction, modalId }) => {
    return (
        <>
            {/* Modal */}
            <div
                className="modal fade"
                id={modalId} // Use the passed modalId for a unique modal
                tabIndex="-1"
                aria-labelledby={`${modalId}Label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}Label`}>
                                Transfer Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close rounded-0"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            {transaction ? (
                                <table className="table table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Date :</th>
                                            <td>{moment(transaction?.created_at).format("YYYY-MM-DD hh:mm A")}</td>
                                        </tr>
                                        <tr>
                                            <th>Transfer From :</th>
                                            <td>{transaction?.transfer_form}</td>
                                        </tr>
                                        <tr>
                                            <th>Transfer To :</th>
                                            <td>{transaction?.transfer_to}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount :</th>
                                            <td>{transaction?.amount}</td>
                                        </tr>
                                        <tr>
                                            <th>Charge :</th>
                                            <td>{transaction?.charge}</td>
                                        </tr>
                                        <tr>
                                            <th>Payable :</th>
                                            <td>{transaction?.payable}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger rounded-0"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinanceHistoryModal;
