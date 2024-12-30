import { getServerSession } from "next-auth";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import SaleOnNagadhatWrapper from "../components/thankyouSaleOnNagadhat/SaleOnNagadhatWrapper";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async ({ searchParams }) => {
    const saleOnNagadhatId = searchParams.saleonid;
    const session = await getServerSession(authOptions);
    return (
        <PrivateRoute>
            <>
                <SaleOnNagadhatWrapper
                    saleOnNagadhatId={saleOnNagadhatId}
                    accessToken={session?.accessToken}
                />
            </>
        </PrivateRoute>
    );
};

export default page;
