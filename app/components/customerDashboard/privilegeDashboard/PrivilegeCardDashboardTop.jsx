"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardProduct from "./PrivilegeCardProduct";
import PrivilegeMainCard from "./PrivilegeMainCard";
import { getPrivilegeCardDetails } from "@/app/services/privilegeCard/getPrivilegeCardDetails";
import { useSession } from "next-auth/react";
import LodingFixed from "@/app/components/LodingFixed";

const PrivilegeCardDashboardTop = () => {
    const [isPending, startTransition] = useTransition();
    const [privilegeCardInfo, setPrivilegeCardInfo] = useState({});
    const [cancelToggleStatus, setCancelToggleStatus] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchPrivilegeCardDetails = async () => {
            if (session?.accessToken) {
                try {
                    startTransition(async () => {
                        const privilegeCard = await getPrivilegeCardDetails(
                            session?.accessToken
                        );
                        setPrivilegeCardInfo(privilegeCard?.results || {});
                    });
                } catch (error) {
                    console.error(
                        "Error fetching privilege card details:",
                        error
                    );
                }
            }
        };

        fetchPrivilegeCardDetails();
    }, [session?.accessToken, cancelToggleStatus]);

    console.log("privilegeCardInfo", privilegeCardInfo);

    return (
        <>
            <div className="customer-dashboard-order-history-area h-100">
                {privilegeCardInfo?.privilege_card?.status === 1 ? (
                    <>
                        <PrivilegeMainCard
                            privilegeCardInfo={privilegeCardInfo}
                            cancelToggleStatus={cancelToggleStatus}
                            setCancelToggleStatus={setCancelToggleStatus}
                            isPending={isPending}
                        />
                        {privilegeCardInfo?.cancel_status === 5 && (
                            <PrivilegeCardProduct />
                        )}
                    </>
                ) : isPending ? (
                    <LodingFixed />
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div>
                            <h1>
                                Currently, the {privilegeCardInfo?.product_name}{" "}
                                is Inactive.
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PrivilegeCardDashboardTop;
