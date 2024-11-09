"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardProductTable from "./PrivilegeCardProductTable";
import PrivilegeCardProductTop from "./PrivilegeCardProductTop";
import { useSession } from "next-auth/react";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import LodingFixed from "../../LodingFixed";

const PrivilegeCardProduct = () => {
    const [isPending, startTransition] = useTransition();
    const [searchTerms, setSearchTerms] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [productsData, setProductsData] = useState([]);
    const [productCardLimit, setProductCardLimit] = useState(null);
    const [rendaringCartPrice, setRendaringCartPrice] = useState(false);

    // Handler to set price visibility for a specific product

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            const fetchPrivilegeProduct = async () => {
                try {
                    startTransition(async () => {
                        const params = {
                            search: searchTerms,
                            category: categoryFilter,
                        };
                        const response = await getPrivilegeCardProducts(
                            session.accessToken,
                            params
                        );
                        const cartLimitPrice = parseInt(
                            parseFloat("1000.00"),
                            10
                        );

                        setProductCardLimit(cartLimitPrice);

                        setProductsData(response?.results?.data);
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
                <LodingFixed />
            ) : (
                <PrivilegeCardProductTable
                    productsData={productsData}
                    rendaringCartPrice={rendaringCartPrice}
                    setRendaringCartPrice={setRendaringCartPrice}
                    productCardLimit={productCardLimit}
                />
            )}
        </>
    );
};

export default PrivilegeCardProduct;
