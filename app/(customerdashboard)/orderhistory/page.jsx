"use client";

import { getOrdersByUserId } from "@/app/services/getOrdersByUserId";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import CustomerRightsids from "@/app/components/customerDashboard/orderhistory/CustomerRightsids";
import { useSearchParams } from "next/navigation";

const CustomerDashboardPage = () => {
    const [isPending, startTransition] = useTransition();
    const [customerOrders, setCustomerOrders] = useState([]);
    const { data: session, status } = useSession();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [orderCancel, setOrderCancel] = useState(true);

    const searchParams = useSearchParams();

    useEffect(() => {
        const page = searchParams.get("page");
        if (page && page !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams, currentPage]);
    const limit = 20; //Per Page Category

    useEffect(() => {
        if (status === "authenticated") {
            const getOrderDataFetch = async () => {
                try {
                    startTransition(async () => {
                        const orderData = await getOrdersByUserId(
                            session?.accessToken,
                            currentPage,
                            limit
                        );
                        const orderResult = orderData?.results?.data;
                        setCustomerOrders(orderResult);
                        setLastPage(orderData?.results?.last_page);
                    });
                } catch (error) {
                    console.error("Error fetching order data:", error);
                }
            };
            getOrderDataFetch();
        }
    }, [status, session?.accessToken, currentPage, orderCancel]);

    return (
        <>
            <CustomerRightsids
                customerOrders={customerOrders}
                lastPage={lastPage}
                currentPage={currentPage}
                session={session}
                setOrderCancel={setOrderCancel}
                orderCancel={orderCancel}
                isPending={isPending}
            />
        </>
    );
};

export default CustomerDashboardPage;
