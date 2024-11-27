const AddCustomerSupportTicketPage = () => {
    return (
        <div className="h-100 customer-dashboard-card">
            <div className="px-3 py-3 text-white border-bottom">
                <span
                    className="px-4 py-2 d-inline-block"
                    style={{ background: "#44bc9d" }}
                >
                    Create Ticket
                </span>
            </div>
            <div className="px-3 pt-4">
                <form>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                            Ticket Subject{" "}
                            <span className="text-danger">*</span> :
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Add Your Ticket Subject"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note">
                            Note <span className="text-danger">*</span> :
                        </label>
                        <textarea
                            className="form-control"
                            id="note"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            className="form-control form-control-lg"
                            id="image"
                            type="file"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerSupportTicketPage;
