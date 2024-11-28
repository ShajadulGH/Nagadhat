import { getServerSession } from "next-auth";
import PrivilegeRebateRecordData from "./PrivilegeRebateRecordData";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPrivilegeCardRebateRecord } from "@/app/services/privilegeCard/getPrivilegeCardRebateRecord";

const PrivilegeRebateRecordWrapper = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const response = await getPrivilegeCardRebateRecord(
        session?.accessToken,
        searchParams
    );
    const rebateRecordData = response?.results?.data || [];

    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Rebate History</h4>
            </div>
            <PrivilegeRebateRecordData rebateRecordData={rebateRecordData} />
        </div>
    );
};

export default PrivilegeRebateRecordWrapper;
