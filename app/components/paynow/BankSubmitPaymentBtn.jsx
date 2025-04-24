import { RotatingLines } from "react-loader-spinner";

const BankSubmitPaymentBtn = ({ isPending }) => {
    return (
        <>
            <div className="d-flex justify-content-end">
                <button
                    disabled={isPending}
                    className="add-to-cart-link border-0 text-capitalize rounded-2"
                >
                    {isPending ? (
                        <div
                            style={{
                                height: "21px",
                                width: "90px",
                                textAlign: "center",
                            }}
                        >
                            <RotatingLines
                                visible={true}
                                height="18"
                                width="20"
                                color="#ffffff"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass="w-25"
                            />
                        </div>
                    ) : (
                        "Submit Payment"
                    )}
                </button>
            </div>
        </>
    );
};

export default BankSubmitPaymentBtn;
