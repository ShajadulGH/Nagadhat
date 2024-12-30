import { getSaleOnNagadhatOrderDetails } from "@/app/services/affiliate/getSaleOnNagadhatOrderDetails";
import SaleOnNagadhatLeft from "./SaleOnNagadhatLeft";
import SaleOnNagadhatRight from "./SaleOnNagadhatRight";

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
                        <SaleOnNagadhatLeft responseData={responseData} />
                        <SaleOnNagadhatRight responseData={responseData} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SaleOnNagadhatWrapper;
