"use client";
import { useSession } from "next-auth/react";
import ResaleBonusDetail from "./ResaleBonusDetail";
import ResaleBonusTop from "./ResaleBonusTop";
import { useEffect, useState, useTransition } from "react";
import { getPayoutResaleBonus } from "@/app/services/affiliatepayout/getPayoutResaleBonus";
import NoDataFound from "../../NoDataFound";
import LodingFixed from "../../LodingFixed";
import PayoutSearchForm from "./PayoutSearchForm";
import { useSearchParams } from "next/navigation";
import Pagination from "../../productCategory/Pagination";

const ResaleBonusWrapper = () => {
    const [resalBonusResult, setResalBonusResult] = useState({});
    const [resalBonusData, setResalBonusData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();
    const searchParam = useSearchParams();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const page = searchParam.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParam]);

    const limit = 20;


    const fetchResalBonus = async () => {
        if (status === "authenticated" && session?.accessToken) {
            let params = {
                search: searchTerm,
                limit,
                page: currentPage,
            };
            try {
                startTransition(async () => {
                    const response = await getPayoutResaleBonus(
                        session?.accessToken,
                        params
                    );
                    setResalBonusResult(response?.results || {});
                    setResalBonusData(response?.results?.data || []);
                    setLastPage(response?.results?.last_page);
                });
            } catch (error) {
                console.error("Failed to fetch resale bonus data:", error);
            }
        }
    };

    useEffect(() => {
        fetchResalBonus();
    }, [status, session?.accessToken, searchTerm, currentPage]);

    const serialNumber = (currentPage - 1 ) * limit;

    return (
        <>
            {isPending && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100 pb-4">
                <ResaleBonusTop />
                <PayoutSearchForm
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                {resalBonusData?.length > 0 ? (
                    <>
                        <ResaleBonusDetail
                            resalBonusResult={resalBonusResult}
                            resalBonusData={resalBonusData}
                            serialNumber={serialNumber}
                        />
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />
                    </>
                ) : (
                    !isPending && <NoDataFound />
                )}
            </div>
        </>
    );
};

export default ResaleBonusWrapper;
