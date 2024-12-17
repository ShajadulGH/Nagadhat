import React from 'react'

const TransactionOtpChoiceModal = ({handleManageOtpChange, modalRef}) => {
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
                            <button onClick={handleManageOtpChange} type="button" class="add-to-cart-link border-0 w-100">Sand</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionOtpChoiceModal
