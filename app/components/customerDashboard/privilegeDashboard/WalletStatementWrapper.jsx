import { getServerSession } from "next-auth";
import WalletStatementData from "./WalletStatementData";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardWalletStatement } from "@/app/services/privilegeCard/getPrivilegeCardWalletStatement";

const WalletStatementWrapper = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardWalletStatement(
        session?.accessToken,
        searchParams
    );
    const statementData = response?.results || [];

    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Statement</h4>
            </div>
            <WalletStatementData statementData={statementData} />
        </div>
    );
};

export default WalletStatementWrapper;
