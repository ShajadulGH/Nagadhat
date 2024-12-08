import { getServerSession } from "next-auth";
import PrivilegeRebateRecordData from "./PrivilegeRebateRecordData";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardRebateRecord } from "@/app/services/privilegeCard/getPrivilegeCardRebateRecord";

const PrivilegeRebateRecordWrapper = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page) || 1;
    const limit = 20; //Per Page Category
    const params = {
        page,
        limit
    }
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardRebateRecord(
        session?.accessToken,
        params
    );
    const rebateRecordData = response?.results?.data || [];
    const lastPage = response?.results?.last_page || 1;

    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Rebate History</h4>
            </div>
            <PrivilegeRebateRecordData
                rebateRecordData={rebateRecordData}
                currentPage={page}
                lastPage={lastPage}
            />
        </div>
    );
};

export default PrivilegeRebateRecordWrapper;
