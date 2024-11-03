"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAffiliateReferralCode } from "@/app/services/affiliate/getAffiliateReferralCode";

const ReferralPage = ({ params }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const referralCode = params.id;

    const [userInfo, setUserInfo] = useState(null);
    const [userInfoData, setUserInfoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setError(null);
                startTransition(async () => {
                    const data = await getAffiliateReferralCode(referralCode);
                    setUserInfoData(data);
                    if (data?.results) {
                        setUserInfo(data.results);
                    } else {
                        setError("Invalid referral code");
                        router.push("/");
                    }
                });
            } catch (error) {
                setError("Failed to fetch referral information");
                console.error("Fetch error:", error);
                router.push("/");
            }
        };

        if (referralCode) {
            fetchUserInfo();
        }
    }, [referralCode]);

    useEffect(() => {
        if (userInfo) {
            router.push(
                `/registration?id=${userInfo?.id}&ref_name=${userInfo?.name}`
            );
        }
    }, [userInfo]);

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center vh-100  ">
                <div className="d-flex align-items-center justify-content-center">
                    {isPending && (
                        <div className=" d-flex align-items-center justify-content-center vh-100">
                            <h1 className="text-center">Loading... </h1>;
                        </div>
                    )}
                    {error && (
                        <p className="text-center text-danger">{error}</p>
                    )}
                    {!isPending && !error && !userInfo && (
                        <p>{userInfoData?.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralPage;
