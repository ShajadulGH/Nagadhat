"use client";

import PrivilegeCardShoppingWrapper from "@/app/components/customerDashboard/privilegeDashboard/PrivilegeCardShoppingWrapper";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PrivilegeCardShoppingListPage = () => {
    const { data: session } = useSession();
    const [perCardLimit, setPerCardLimit] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            if (session?.accessToken) {
                try {
                    const response = await getPrivilegeCardProducts(
                        session?.accessToken
                    );
                    setPerCardLimit(response?.results?.card_limit);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchData();
    }, [session?.accessToken]);

    return (
        <>
            <PrivilegeCardShoppingWrapper perCardLimit={perCardLimit} />
        </>
    );
};

export default PrivilegeCardShoppingListPage;
