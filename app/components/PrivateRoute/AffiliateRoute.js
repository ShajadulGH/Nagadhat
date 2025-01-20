import { getUserDashboard } from "@/app/services/userdashboard/getUserDashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DefaultLoader from "../defaultloader/DefaultLoader";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const AffiliateRoute = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(`/login?from=${encodeURIComponent("/dashboard")}`);
    }

    const response = await getUserDashboard(session.accessToken);
    
    if (response?.results?.status != 1) {
        redirect(`/dashboard`);
    }
    return (
        <>
            {session ? children : <DefaultLoader />}
        </>
    );
};

export default AffiliateRoute;