"use client";
import { getAffiliateFinanceAgents } from "@/app/services/affiliate-finance/getAffiliateFinanceAgents";
import { postOrderFullPaymentWithAgent } from "@/app/services/placeorder/postOrderFullPaymentWithAgent";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState, useTransition } from "react";
import { getPayAgentLists } from "@/app/services/affiliate-finance/getPayAgentLists";
import { useRouter } from "next/navigation";

const PayWithAgentModal = ({
    showAgentModal,
    setShowAgentModal,
    orderSummary,
}) => {
    const [financeAgentInfo, setFinanceAgentInfo] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [referenceNote, setReferenceNote] = useState("");

    const { status, data: session } = useSession();
    const router = useRouter();

    // function for FinanceAgentInfo
    useEffect(() => {
        if (session?.accessToken) {
            const fetchFinanceAgents = async () => {
                try {
                    startTransition(async () => {
                        const response = await getPayAgentLists(
                            session?.accessToken
                        );
                        setFinanceAgentInfo(response?.results?.agents || []);
                    });
                } catch (error) {
                    console.error("Error fetching Finance Agent data", error);
                }
            };
            fetchFinanceAgents();
        }
    }, [session?.accessToken]);

    const handleSelectAgent = (event) => {
        const agentId = parseInt(event.target.value);
        const selectedAgent = financeAgentInfo.find(
            (agent) => agent?.agent_id === agentId
        );
        setSelectedAgent(selectedAgent);
    };

    //function for handleSubmitAgentPayment
    const handleSubmitAgentPayment = async (event) => {
        event.preventDefault();
        if (!selectedAgent) {
            toast.error("Please select an agent before confirming payment.");
            return;
        }
        try {
            const agentPayData = {
                order_id: orderSummary?.order_id,
                nh_agent_id: selectedAgent?.agent_id,
                payment_getway: "Pay With Agent",
                note_1: referenceNote,
            };

            const response = await postOrderFullPaymentWithAgent(
                agentPayData,
                session?.accessToken
            );
            if (!response?.error) {
                toast.success(
                    "Agent payment details submitted successfully.",
                    response?.message
                );
                setShowAgentModal(false);
                router.push(`/thankyou?orderId=${orderSummary?.order_id}`);
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error("Failed to submit agent payment details.");
            console.error("Error submitting agent payment details:", error);
        }
    };

    return (
        <>
            <div
                className={`modal fade ${showAgentModal ? "show" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAgentModal ? "block" : "none" }}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Pay with Agent</h5>
                            <button
                                type="button"
                                className="close border-0 bg-black text-black bg-transparent"
                                onClick={() => setShowAgentModal(false)}
                            >
                                <span className=" fs-4 ">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mx-auto py-3 d-flex justify-content-center align-content-center px-3">
                                <Image
                                    width={230}
                                    height={75}
                                    src="/images/Agent-Pay-1.png"
                                    alt="Agent-Pay Image"
                                    className=" d-block"
                                    style={{ objectFit: "fill" }}
                                />
                            </div>
                            <form>
                                <div className="form-group pb-3">
                                    <label className="pb-2">Invoice</label>
                                    <input
                                        type="text"
                                        value={orderSummary?.invoice}
                                        className="form-control focus-ring focus-ring-light"
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <label className="pb-2">Agent</label>
                                    <select
                                        className="form-select focus-ring focus-ring-light"
                                        onChange={handleSelectAgent}
                                    >
                                        <option>Select Agent</option>
                                        {financeAgentInfo.length > 0 ? (
                                            financeAgentInfo.map((item) => (
                                                <option
                                                    key={item.agent_id}
                                                    value={item.agent_id}
                                                >
                                                    {item.name} ({item.phone})
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>
                                                No agents available
                                            </option>
                                        )}
                                    </select>
                                </div>
                                {selectedAgent && (
                                    <div className="form-group pb-3">
                                        <h5>Payment Summary:</h5>
                                        <p>
                                            Please pay ৳{" "}
                                            {orderSummary?.grand_total} to the
                                            following agent and wait for
                                            confirmation.
                                        </p>
                                        <p>
                                            Agent Name: {selectedAgent?.name},
                                        </p>
                                        <p>Phone: {selectedAgent?.phone}</p>
                                    </div>
                                )}

                                <div className="form-group pb-3">
                                    <label className="pb-2">
                                        Reference (optional)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control focus-ring focus-ring-light"
                                        name="note_1"
                                        value={referenceNote}
                                        onChange={(e) =>
                                            setReferenceNote(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setShowAgentModal(false)}
                            >
                                Close
                            </button> */}
                            <button
                                type="submit"
                                onClick={handleSubmitAgentPayment}
                                style={{
                                    cursor: selectedAgent
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                                className="add-to-cart-link border-0 rounded-2"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayWithAgentModal;
