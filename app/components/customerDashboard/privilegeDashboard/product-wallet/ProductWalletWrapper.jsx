import { getServerSession } from "next-auth";
import ProductWallet from "./ProductWallet";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardProductWallet } from "@/app/services/privilegeCard/getPrivilegeCardProductWallet";

const ProductWalletWrapper = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page) || 1;
    const limit = 20;
    const params = {
        page,
        limit,
    };
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardProductWallet(
        session?.accessToken,
        params
    );
    
    const lastPage = response?.results?.last_page || 1;
    const statementData = response?.results?.data || [];

    return (
        <>
            <div className="customer-dashboard-order-history-area  ">
                <div className="customer-dashboard-order-history-title">
                    <h4 className="mb-0">Product Wallet</h4>
                </div>
                <ProductWallet
                    statementData={statementData}
                    currentPage={page}
                    lastPage={lastPage}
                />
            </div>
        </>
    );
};

export default ProductWalletWrapper;
