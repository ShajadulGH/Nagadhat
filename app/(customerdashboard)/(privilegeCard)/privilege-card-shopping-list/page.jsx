import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PrivilegeCardShoppingWrapper from "@/app/components/customerDashboard/privilegeDashboard/PrivilegeCardShoppingWrapper";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import { getServerSession } from "next-auth";

const PrivilegeCardShoppingListPage = async () => {
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardProducts(session?.accessToken);
    const perCardLimit = response?.results?.card_limit;

    return (
        <>
            <PrivilegeCardShoppingWrapper perCardLimit={perCardLimit} />
        </>
    );
};

export default PrivilegeCardShoppingListPage;
