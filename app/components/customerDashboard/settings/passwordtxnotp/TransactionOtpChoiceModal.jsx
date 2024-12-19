import React from 'react'

<<<<<<< HEAD
<<<<<<< HEAD
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
                            <button onClick={handleManageOtpChange} type="button" className="add-to-cart-link border-0 w-100">Sand</button>
=======
const TransactionOtpChoiceModal = () => {
=======
const TransactionOtpChoiceModal = ({handleManageOtpChange, modalRef}) => {
>>>>>>> e134429 (updated)
    return (
        <>
            <div ref={modalRef}  class="modal fade" id="TransactionOtp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="TransactionOtpLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="TransactionOtpLabel">Send OTP To                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Phone - 01310881055
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Email - 9876543210@example.com
                                    </label>
                            </div>
                            <p><small>* choose from your phone or email for OTP code.</small></p>
                        </div>
                        <div class="modal-footer justify-content-between">
                            {/* <button type="button" class="add-to-cart-link border-0 bg-dark-subtle" data-bs-dismiss="modal">Close</button> */}
<<<<<<< HEAD
                            <button type="button" class="add-to-cart-link border-0 w-100">Sand</button>
>>>>>>> 88913d0 (updated)
=======
                            <button onClick={handleManageOtpChange} type="button" class="add-to-cart-link border-0 w-100">Sand</button>
>>>>>>> e134429 (updated)
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionOtpChoiceModal
