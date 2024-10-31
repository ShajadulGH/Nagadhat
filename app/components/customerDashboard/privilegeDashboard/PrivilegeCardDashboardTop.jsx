import { getServerSession } from "next-auth";
import PrivilegeCardModal from "./PrivilegeCardModal";
import PrivilegeCardProduct from "./PrivilegeCardProduct";
import PrivilegeMainCard from "./PrivilegeMainCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardDetails } from "@/app/services/privilegeCard/getPrivilegeCardDetails";

const PrivilegeCardDashboardTop = async () => {
    const session = await getServerSession(authOptions);

    const privilegeCard = await getPrivilegeCardDetails(session?.accessToken);
    const privilegeCardInfo = privilegeCard?.results || {};

    return (
        <>
            <div className="customer-dashboard-order-history-area">
                <PrivilegeMainCard
                    privilegeCardInfo={privilegeCardInfo}
                    session={session}
                />
                <PrivilegeCardProduct />
            </div>

            {/* <!-- Modal --> */}
            <PrivilegeCardModal />
        </>
    );
};

export default PrivilegeCardDashboardTop;
