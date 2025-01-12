import Link from "next/link";

const SaleOnNagadhatLeft = ({ responseData }) => {

    return (
        <div className="col-lg-5">
            <div className="order-billing-info">
                <div className="thank-you">
                    <h1>Thank You!</h1>
                    <h6 className="mb-3">
                        We sincerely thank you for using the Nagadhat website to
                        purchase products directly from manufacturers and
                        agreeing to resell them under Nagadhat's specified
                        terms.
                    </h6>
                    <p className="pb-2">
                        Your participation is a shining example of trust and
                        support in us. We are proud to have you with us, and
                        together we are moving forward.
                    </p>
                    <p className="pb-2">
                        We promise to remain dedicated to providing you with the
                        highest quality service and meeting your expectations.
                    </p>
                    <p className="pb-2">
                        Your journey to success is an inspiration to us.
                    </p>
                    <p>
                        Nagadhat Bangladesh Limited <br />
                        Commitment to Fulfilling Expectations
                    </p>
                </div>

                <div className="billing-btn-area">
                    <Link
                        href={`/buyback-policy-agreement/${responseData?.order_id}`}
                        className="add-to-cart-link border-0 text-capitalize"
                    >
                        Download Agreement
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SaleOnNagadhatLeft;
