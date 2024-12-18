import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PrivilegeCardShoppingWrapper from "@/app/components/customerDashboard/privilegeDashboard/PrivilegeCardShoppingWrapper";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const PrivilegeCardShoppingListPage = async () => {
    // const session = await getServerSession(authOptions);
    // const response = await getPrivilegeCardProducts(session?.accessToken);
    // const perCardLimit = response?.results?.card_limit;

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
