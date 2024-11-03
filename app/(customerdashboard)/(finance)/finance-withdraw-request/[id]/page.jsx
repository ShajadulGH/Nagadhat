"use client";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import { getActiveResourcesInformation } from "@/app/services/affiliate-finance/getActiveResourcesInformation";
import { postOTPWithdrawVerification } from "@/app/services/affiliate-finance/postOTPWithdrawVerification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const FinanceWithdraw = ({ params }) => {
    const [withdrawRequestData, setWithdrawRequestData] = useState(null);
    const { data: session } = useSession();
    const { id } = params;
    const route = useRouter();

    // Fetch withdraw details
    useEffect(() => {
        const fetchWithdrawDetails = async () => {
            try {
                if (session?.accessToken && id) {
                    const request = await getActiveResourcesInformation(session.accessToken, id);
                    if (request.code === 200) {
                        setWithdrawRequestData(request?.results);
                    } else {
                        toast.error(request.message);
                        console.log(request.message);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWithdrawDetails();
    }, [session?.accessToken, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = e.target.otp.value;
        try {
            const request = await postOTPWithdrawVerification(session.accessToken, { otp })
            if (request.code === 200) {
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Your OTP Varifaticon Success",
                    showConfirmButton: true,
                    timer: 2000
                });
                route.push(`/finance-withdraw`);
            } else {
                toast.error(request.message);
                console.log("PIN request:", request);
            }
        } catch (error) {
            console.log("PIN request error:", error);
            toast.error(error.message)
        }
    };

    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Withdraw Request Verification" />
            <div className="p-4">
                <div>
                    <h3 className="mb-3">Summary</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Withdraw Method :</th>
                                        <td>{withdrawRequestData?.billing_method}</td>
                                    </tr>
                                    {withdrawRequestData?.user?.agent_name &&
                                        <tr>
                                            <th>Withdraw By :</th>
                                            <td>{withdrawRequestData?.user?.agent_name}</td>
                                        </tr>
                                    }
                                    {withdrawRequestData?.account_number &&
                                        <tr>
                                            <th>Account Number :</th>
                                            <td>{withdrawRequestData?.account_number}</td>
                                        </tr>
                                    }

                                    {withdrawRequestData?.billing_method == "Bank" && (<>
                                        <tr>
                                            <th>Bank Name :</th>
                                            <td>{withdrawRequestData?.bank.bank_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Account Holder Name :</th>
                                            <td>{withdrawRequestData?.bank?.account_holder_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Branch Name :</th>
                                            <td>{withdrawRequestData?.bank?.branch_name}</td>
                                        </tr>
                                    </>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Amount :</th>
                                        <td>{withdrawRequestData?.amount}</td>
                                    </tr>
                                    <tr>
                                        <th>Charge :</th>
                                        <td>{withdrawRequestData?.charge}</td>
                                    </tr>
                                    <tr>
                                        <th>Payable :</th>
                                        <td>{withdrawRequestData?.payable}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="py-2" />
                    <label htmlFor="otp" className="form-label">
                        Enter your transaction OTP to proceed. 
                        <span className="text-danger fs-5">*</span>
                    </label>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group pb-3 d-flex gap-3 align-items-center">
                            <input
                                type="number"
                                required
                                className="form-control"
                                name="otp"
                                placeholder="OTP"
                            />
                            <button
                                type="submit"
                                className="ms-auto add-to-cart-link border-0"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FinanceWithdraw;
