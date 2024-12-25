"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardProductTable from "./PrivilegeCardProductTable";
import PrivilegeCardProductTop from "./PrivilegeCardProductTop";
import { useSession } from "next-auth/react";
import { getPrivilegeCardProducts } from "@/app/services/privilegeCard/getPrivilegeCardProducts";
import LodingFixed from "../../LodingFixed";
import { useSearchParams } from "next/navigation";

const PrivilegeCardProduct = () => {
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [productsData, setProductsData] = useState([]);
    const [productCardLimit, setProductCardLimit] = useState(null);
    const [rendaringCartPrice, setRendaringCartPrice] = useState(false);
    const [alreadyBuyResponse, setAlreadyBuyResponse] = useState({});
    const searchParam = useSearchParams();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    // Handler to set price visibility for a specific product

    const { data: session } = useSession();

    useEffect(() => {
        const page = searchParam.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParam]);

    useEffect(() => {
        if (session?.accessToken) {
            const fetchPrivilegeProduct = async () => {
                try {
                    startTransition(async () => {
                        const params = {
                            search: searchTerm,
                            category: categoryFilter,
                            limit,
                            page: currentPage,
                        };
                        const response = await getPrivilegeCardProducts(
                            session.accessToken,
                            params
                        );
                        setAlreadyBuyResponse(response);
                        const cartLimitPrice = parseInt(
                            parseFloat("1000.00"),
                            10
                        );

                        setProductCardLimit(cartLimitPrice);

                        setProductsData(response?.results?.data);
                        setLastPage(response?.results?.last_page);
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
    }, [
        session?.accessToken,
        searchTerm,
        categoryFilter,
        rendaringCartPrice,
        currentPage,
        // alreadyBuyResponse,
    ]);

    return (
        <>
            <PrivilegeCardProductTop
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />
            {isPending && <LodingFixed />}
            <PrivilegeCardProductTable
                productsData={productsData}
                rendaringCartPrice={rendaringCartPrice}
                setRendaringCartPrice={setRendaringCartPrice}
                productCardLimit={productCardLimit}
                currentPage={currentPage}
                lastPage={lastPage}
                alreadyBuyResponse={alreadyBuyResponse}
            />
        </>
    );
};

export default PrivilegeCardProduct;
