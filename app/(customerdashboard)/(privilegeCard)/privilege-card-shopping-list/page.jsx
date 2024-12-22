"use client";

import PrivilegeCardShoppingWrapper from "@/app/components/customerDashboard/privilegeDashboard/PrivilegeCardShoppingWrapper";
import LodingFixed from "@/app/components/LodingFixed";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

const PrivilegeCardShoppingListPage = () => {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const [perCardLimit, setPerCardLimit] = useState(undefined);
    const [response, setResponse] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (session?.accessToken) {
                try {
                    startTransition(async () => {
                        const response = await getPrivilegeCardProducts(
                            session?.accessToken
                        );
                        setResponse(response);

                        setPerCardLimit(response?.results?.card_limit);
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchData();
    }, [session?.accessToken]);

    return (
        <>
            {response?.code === 402 ? (
                <div className="bg-white d-flex flex-column gap-4 justify-content-center align-items-center vh-100">
                    <>
                        <h1 className="fs-3 text-capitalize text-center">
                            {response?.message}
                        </h1>
                        <Link
                            href="/privilege-card-dashboard"
                            className="btn btn-danger"
                        >
                            Go Back
                        </Link>
                    </>
                </div>
            ) : (
                <>
                    {isPending && <LodingFixed />}
                    <PrivilegeCardShoppingWrapper
                        perCardLimit={perCardLimit}
                        isPending={isPending}
                    />
                </>
            )}
        </>
    );
};

export default PrivilegeCardShoppingListPage;
