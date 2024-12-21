import React from 'react'

const TransactionOtpChoiceModal = ({ handleManageOtpChange, modalRef, mobileNumber }) => {
    return (
        <>
            <div
                ref={modalRef}
                className="modal fade"
                id="TransactionOtp"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="TransactionOtpLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="TransactionOtpLabel">
                                Send OTP To
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Phone - {mobileNumber}
                                </label>
                            </div>
                            {/* <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    Email - 9876543210@example.com
                                </label>
                            </div> */}
                            <p><small>* choose from your phone or email for OTP code.</small></p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleManageOtpChange} type="button" className="add-to-cart-link border-0 w-100">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionOtpChoiceModal
