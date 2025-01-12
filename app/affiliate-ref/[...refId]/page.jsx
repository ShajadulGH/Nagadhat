"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";

const RefProduct = ({ params }) => {
    const { refId } = params;

    const [userId, slug] = refId;
    const router = useRouter();
    const [outletId, setOutletId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
        return 3;
    });

    useEffect(() => {
        // Set userId in localStorage
        localStorage.setItem("referrerID", userId);

        // Redirect to the specified route
        router.push(`/products/${slug}?outlet_id=${outletId}`);
    }, [userId, slug, router]);

    return <DefaultLoader />;
};

export default RefProduct;
