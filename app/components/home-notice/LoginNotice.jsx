"use client";
import { useEffect, useState } from "react";

const LoginNotice = () => {
    const [showPromo, setShowPromo] = useState(true);

    useEffect(() => {
        setShowPromo(true);
        const timer = setTimeout(() => {
            setShowPromo(false);
        }, 5000); // Auto-close after 5 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowPromo(false); // Close modal on button click
    };

    return (
        <>
            {showPromo && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="promoModalLabel"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h5
                                    className="modal-title"
                                    id="promoModalLabel"
                                >
                                     🚨 Important Notice 🚨 
                                </h5>
                                <button
                                    type="button"
                                    className="close btn btn-danger"
                                    onClick={handleClose}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center py-4">
                                <h4>
                                    Sorry! Due to a server issue, there is
                                    currently some difficulty logging in. Our IT
                                    team is working quickly to resolve the
                                    issue. Please try again after some time.
                                </h4>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginNotice;
