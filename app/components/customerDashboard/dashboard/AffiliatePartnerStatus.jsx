"use client";

import { getApplyForAffiliate } from "@/app/services/affiliate/getApplyForAffiliate";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LodingFixed from "../../LodingFixed";

const AffiliatePartnerStatus = ({ userDashboard, isPending }) => {
    const [affiliateStatus, setAffiliateStatus] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (userDashboard?.affiliate_user_status === "Affiliate") {
            setAffiliateStatus(1);
        }
    }, [userDashboard?.affiliate_user_status]);

    const fetchApplyAffiliate = async () => {
        if (!session?.accessToken) {
            console.error("No access token found.");
            return;
        }
        try {
            const applyStatus = await getApplyForAffiliate(
                session?.accessToken
            );
            setAffiliateStatus(applyStatus?.results?.status);
            if (applyStatus?.results?.status == 1) {
                Swal.fire({
                    title: "Success!",
                    text: "You are now an active affiliate partner.",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Application Failed!",
                    text: "Unable to activate affiliate status.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Failed to fetch apply for affiliate data:", error);
        }
    };

    const handleJoinClick = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to apply for affiliate program!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetchApplyAffiliate();
            }
        });
    };

    return (
        <div className="customer-dashboard-card flex-1">
            <div className="border-bottom p-3">
                <h2 className="mb-0 customer-dashboard-subtitle">
                    Affiliate Partner
                </h2>
            </div>
            <div
                className="d-flex flex-column align-items-center justify-content-center gap-4 text-center p-4"
                id="affiliateApply"
            >
                <Link
                    className="customer-dashboard-affiliate-badge"
                    href="/affiliatedashboard"
                >
                    <Image
                        src="/images/affiliate-badge.gif"
                        className="img-fluid"
                        width={100}
                        height={100}
                        alt="affiliate-badge"
                    />
                </Link>

                {isPending ? (
                    <h3>Loading...</h3>
                ) : affiliateStatus !== 1 ? (
                    <div className="affiliate-status-title">
                        <h4 className="mb-4">
                            Status: <span>Not Active</span>
                        </h4>
                        <div className="d-flex flex-column">
                            <button
                                onClick={handleJoinClick}
                                className="border-0 btn btn-success mb-2"
                            >
                                Join Today
                            </button>
                            <Link href="#">
                                * Read our affiliate terms and conditions
                            </Link>
                        </div>
                    </div>
                ) : (
                    <h4 className="mb-4">
                        Status: <span>Active</span>
                    </h4>
                )}
            </div>
        </div>
    );
};

export default AffiliatePartnerStatus;
