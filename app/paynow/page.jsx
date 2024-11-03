import dynamic from "next/dynamic";
import PayNowTopIcon from "../components/paynow/PayNowTopIcon";
import Service from "../components/Service";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const PayNowDetails = dynamic(
    () => import("../components/paynow/PayNowDetails"),
    {
        ssr: false,
    }
);

const PayNowPage = () => {
    return (
        <>
            <PrivateRoute>
                <div className="pay-now-wrapper pt-4">
                    <div className="container">
                        {/* <PayNowTopIcon /> */}
                        <PayNowDetails />
                    </div>
                    <Service />
                </div>
            </PrivateRoute>
        </>
    );
};

export default PayNowPage;
