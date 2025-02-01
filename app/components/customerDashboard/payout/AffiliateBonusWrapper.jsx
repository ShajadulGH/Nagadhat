"use client";
import { useEffect, useState, useTransition } from "react";
import AffiliateBonusDetail from "./AffiliateBonusDetail";
import AffiliateBonusTop from "./AffiliateBonusTop";
import { useSession } from "next-auth/react";
import { getPayoutAffiliateBonus } from "@/app/services/affiliatepayout/getPayoutAffiliateBonus";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";
import { useSearchParams } from "next/navigation";
import PayoutSearchForm from "./PayoutSearchForm";
import Pagination from "../../productCategory/Pagination";

const AffiliateBonusWrapper = () => {
    const [affiliateBonusResult, setAffiliateBonusResult] = useState({});
    const [affiliateBonusData, setAffiliateBonusData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: session, status } = useSession();
    const searchParam = useSearchParams();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    useEffect(() => {
        const page = parseInt(searchParam.get("page"), 10);
        if (!isNaN(page) && page !== currentPage) {
            setCurrentPage(page);
        }
    }, [searchParam]);
    

    const fetchAffiliateBonus = async () => {
        if (status !== "authenticated" || !session?.accessToken) return;
    
        let params = {
            search: searchTerm,
            limit,
            page: currentPage,
        };
        try {
            const response = await getPayoutAffiliateBonus(session.accessToken, params);
            setAffiliateBonusResult(response?.results || {});
            setAffiliateBonusData(response?.results?.data || []);
            setLastPage(response?.results?.last_page);
        } catch (error) {
            console.error("Failed to fetch affiliate bonus data:", error);
        }
    };
    

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            fetchAffiliateBonus();
        }
    }, [status, session?.accessToken, searchTerm, currentPage]);
    

    const serialNumber = (currentPage - 1) * limit;

    return (
        <>
            {isPending && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100 pb-4">
                <AffiliateBonusTop />
                <PayoutSearchForm
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                {affiliateBonusData?.length > 0 ? (
                    <div>
                        <AffiliateBonusDetail
                            affiliateBonusResult={affiliateBonusResult}
                            affiliateBonusData={affiliateBonusData}
                            serialNumber={serialNumber}
                        />
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />
                    </div>
                ) : (
                    !isPending && <NoDataFound />
                )}
            </div>
        </>
    );
};

export default AffiliateBonusWrapper;
