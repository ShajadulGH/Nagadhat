"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import DefaultLoader from "../defaultloader/DefaultLoader";
import { requestPage } from "@/app/utils";

const PrivateRoute = ({ children }) => {
    const { status, data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated") {
            requestPage(pathname);
            router.push(`/login?from=${encodeURIComponent(pathname || "/")}`);
        }
    }, [status, router]);

    if (status === "loading") {
        return <DefaultLoader />; // Correctly render the DefaultLoader component
    }

    if (status === "authenticated") {
        return children;
    }

    return null; // Optionally return a fallback component or null
};

export default PrivateRoute;
