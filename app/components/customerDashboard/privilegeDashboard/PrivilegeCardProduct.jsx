"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardProductTable from "./PrivilegeCardProductTable";
import PrivilegeCardProductTop from "./PrivilegeCardProductTop";
import { useSession } from "next-auth/react";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import DefaultLoader from "../../defaultloader/DefaultLoader";

const PrivilegeCardProduct = () => {
    const [isPending, startTransition] = useTransition();
    const [searchTerms, setSearchTerms] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [productsData, setProductsData] = useState([]);
    const [rendaringCartPrice, setRendaringCartPrice] = useState(false);

    const [showPriceAddCart, setshowPriceAddCart] = useState({});
    // Handler to set price visibility for a specific product
    const handleSetShowPrice = (productId) => {
        setshowPriceAddCart((prev) => ({
            ...prev,
            [productId]: true,
        }));
    };

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            const fetchPrivilegeProduct = async () => {
                try {
                    const params = {
                        search: searchTerms,
                        category: categoryFilter,
                    };
                    startTransition(async () => {
                        const response = await getPrivilegeCardProducts(
                            session.accessToken,
                            params
                        );
                        setProductsData(response?.results?.data || []);
                    });
                } catch (error) {
                    console.error(
                        "Error fetching Privilege Card Products:",
                        error
                    );
                }
            };
            fetchPrivilegeProduct();
        }
    }, [session?.accessToken, searchTerms, categoryFilter, rendaringCartPrice]);

    return (
        <>
            <PrivilegeCardProductTop
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />
            {isPending ? (
                <DefaultLoader />
            ) : (
                <PrivilegeCardProductTable
                    productsData={productsData}
                    showPriceAddCart={showPriceAddCart}
                    handleSetShowPrice={handleSetShowPrice}
                    rendaringCartPrice={rendaringCartPrice}
                    setRendaringCartPrice={setRendaringCartPrice}
                />
            )}
        </>
    );
};

export default PrivilegeCardProduct;
