import { postVerifyTransferOtp } from '@/app/services/affiliate-finance/postVerifyTransferOtp';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TransferVerifyOTPModal = ({ transferRequestData }) => {
    const [otp, setOtp] = useState('');
    const [isTermsChecked, setIsTermsChecked] = useState(false); // State to track checkbox
    const { data: session, status } = useSession();
    const modalRef = useRef(null); // Reference for modal

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fund_transfer_id: transferRequestData?.id || 1, // Use the data passed from transferRequestData
            transfer_form: transferRequestData?.transfer_form,
            transfer_to: transferRequestData?.transfer_to,
            transfer_type: transferRequestData?.transfer_type,
            amount: transferRequestData?.amount,
            charge: transferRequestData?.charge,
            payable: transferRequestData?.payable,
            otp, // Use the otp state
        };

        // API call to verify the OTP
        const response = await postVerifyTransferOtp(session?.accessToken, data)
        console.log(response);
        if (response.code === 200) {
            // Close modal programmatically
            const modalElement = modalRef.current;
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide(); // Close modal
            }
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500
              });
        }else{
            toast.error(response.message)
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="successModal"
                tabIndex="-1"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
                ref={modalRef} // Attach ref here
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="successModalLabel">
                                Verify Transfer
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered table-hover">
                                            <tbody>
                                                <tr>
                                                    <th>Transfer From :</th>
                                                    <td>{transferRequestData?.transfer_form}</td>
                                                </tr>
                                                <tr>
                                                    <th>Transfer To :</th>
                                                    <td>{transferRequestData?.transfer_to}</td>
                                                </tr>
                                                <tr>
                                                    <th>Amount :</th>
                                                    <td>{transferRequestData?.amount}</td>
                                                </tr>
                                                {transferRequestData?.charge ? (
                                                    <tr>
                                                        <th>Charge :</th>
                                                        <td>{transferRequestData?.charge}</td>
                                                    </tr>
                                                ):""}
                                                {transferRequestData?.payable ? (
                                                    <tr>
                                                        <th>Payable :</th>
                                                        <td>{transferRequestData?.payable}</td>
                                                    </tr>
                                                ):""}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        {transferRequestData?.transfer_type === "C2S" && (
                                            <>
                                                <label htmlFor="otp" className="form-label">
                                                    Enter your correct OTP to continue.
                                                    <span className="text-danger fs-5">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    className="form-control"
                                                    name="otp"
                                                    placeholder="OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                            </>
                                        )}
                                        <div className="py-3">
                                            <label className="aiz-checkbox" htmlFor="terms">
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    required
                                                    onChange={(e) => setIsTermsChecked(e.target.checked)}
                                                />
                                                <span> I agree to the </span>
                                            </label>
                                            <a className="text-danger" href="#"> Terms and Conditions</a>,
                                            <a className="text-danger" href="#"> Return Policy </a>
                                            &amp;
                                            <a className="text-danger" href="#"> Privacy Policy</a>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className={`ms-auto add-to-cart-link border-0 ${!isTermsChecked ? "disabled-button":""}`}
                                            disabled={!isTermsChecked} // Disable button if terms are not checked
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransferVerifyOTPModal;
