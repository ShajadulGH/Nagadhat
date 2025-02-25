"use client";
import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import PrivilegeRebateRecordData from "./PrivilegeRebateRecordData";
import { getPrivilegeCardRebateRecord } from "@/app/services/privilegeCard/getPrivilegeCardRebateRecord";
import DefaultLoader from "../../defaultloader/DefaultLoader";

const PrivilegeRebateRecordWrapper = ({ searchParams }) => {
    const { data: session } = useSession();
    const [rebateRecordData, setRebateRecordData] = useState([]);
    const [rebateRecordRecall, setRebateRecordRecall] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    const page = parseInt(searchParams?.page) || 1;
    const limit = 20;

    useEffect(() => {
        const fetchRebateRecords = async () => {
            if (!session?.accessToken) return;

            try {
                startTransition(async () => {
                    const response = await getPrivilegeCardRebateRecord(
                        session.accessToken,
                        { page, limit }
                    );
                    setRebateRecordData(response?.results?.data || []);
                    setLastPage(response?.results?.last_page || 1);
                });
            } catch (error) {
                console.error("Error fetching rebate records:", error);
            }
        };

        fetchRebateRecords();
    }, [session?.accessToken, page, rebateRecordRecall]);

    return (
        <div className="customer-dashboard-order-history-area h-100 ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Rebate History</h4>
            </div>
            {isPending ? (
                <DefaultLoader />
            ) : (
                <PrivilegeRebateRecordData
                    rebateRecordData={rebateRecordData}
                    currentPage={page}
                    lastPage={lastPage}
                    setRebateRecordRecall={setRebateRecordRecall}
                    rebateRecordRecall={rebateRecordRecall}
                />
            )}
        </div>
    );
};

export default PrivilegeRebateRecordWrapper;
