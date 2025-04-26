import { getSaleOnNagadhatOrderDetails } from "@/app/services/affiliate/getSaleOnNagadhatOrderDetails";
import SaleOnNagadhatLeft from "./SaleOnNagadhatLeft";
import SaleOnNagadhatRight from "./SaleOnNagadhatRight";
import Link from "next/link";

const SaleOnNagadhatWrapper = async ({ accessToken, saleOnNagadhatId }) => {
    const response = await getSaleOnNagadhatOrderDetails(
        accessToken,
        saleOnNagadhatId
    );
    const responseData = response?.results;

    return (
        <>
            <section className="order-confirm-section-area">
                <div className="custom-container">
                    <div className="row align-items-center order-confirm-section  gy-5">
                        <SaleOnNagadhatLeft />
                        <SaleOnNagadhatRight responseData={responseData} />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-center gap-2 gap-md-3 pt-4">
                                <div className="billing-btn-area">
                                    <Link
                                        href={`/buyback-policy-agreement/${responseData?.order_id}?buyback-id=${responseData?.id}`}
                                        className="add-to-cart-link border-0 text-capitalize rounded-2"
                                    >
                                        Download Agreement
                                    </Link>
                                </div>
                                <div className=" d-flex justify-content-center">
                                    <Link
                                        href="/"
                                        className=" add-to-cart-link text-capitalize rounded-2"
                                        style={{ background: "#44bc9d" }}
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SaleOnNagadhatWrapper;
