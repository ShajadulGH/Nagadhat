import { getServerSession } from "next-auth";
import WalletStatementData from "./WalletStatementData";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardWalletStatement } from "@/app/services/privilegeCard/getPrivilegeCardWalletStatement";

const WalletStatementWrapper = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page) || 1;
    const limit = 20; //Per Page Category
    const params = {
        page,
        limit
    }
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardWalletStatement(
        session?.accessToken,
        params
    );
    const lastPage = response?.results?.last_page || 1;
    const statementData = response?.results?.data || [];

    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Statement</h4>
            </div>
            <WalletStatementData
                statementData={statementData}
                currentPage={page}
                lastPage={lastPage}
            />
        </div>
    );
};

export default WalletStatementWrapper;
