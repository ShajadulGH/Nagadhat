"use client";
import PayoutSalaryTop from "./PayoutSalaryTop";
import PayoutSalaryDate from "./PayoutSalaryDate";
import PayoutSalaryDetail from "./PayoutSalaryDetail";
import PayoutSearchForm from "./PayoutSearchForm";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { getAffiliateSalary } from "@/app/services/affiliatepayout/getAffiliateSalary";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";
import Pagination from "../../productCategory/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const PayoutSalaryWrapper = () => {
    const [salaryResult, setSalaryResult] = useState(null);
    const [salaryList, setSalaryList] = useState([]);
    const [salarySearch, setSalarySearch] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParam = useSearchParams();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;
    const { data: session, status } = useSession();

    useEffect(() => {
        const page = searchParam.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParam]);

    useEffect(() => {
        if (session?.accessToken) {
            const fetchSalary = async () => {
                try {
                    startTransition(async () => {
                        const params = {
                            search: salarySearch,
                            limit,
                            page: currentPage,
                        };
                        const response = await getAffiliateSalary(
                            session.accessToken,
                            params
                        );
                        setSalaryResult(response?.results || {});
                        setSalaryList(response?.results?.salary_list || []);
                        setLastPage(response?.results?.last_page);
                    });
                } catch (error) {
                    console.error("Error fetching salary info:", error);
                }
            };
            fetchSalary();
        }
    }, [session?.accessToken, salarySearch, currentPage]);

    const hasSalary = salaryResult && Object.keys(salaryResult).length > 0;
    const serialNumber = (currentPage - 1 ) * limit;

    return (
        <div className="customer-dashboard-order-history-area h-100 pb-4">
            <div className="customer-dashboard-order-history-area">
                <PayoutSalaryTop />
                <div className="customer-dashboard-order-history p-0 py-4">
                    {isPending && <LodingFixed />}
                    <PayoutSalaryDate salaryResult={salaryResult} />
                    <PayoutSearchForm
                        searchTerm={salarySearch}
                        setSearchTerm={setSalarySearch}
                    />
                    {hasSalary ? (
                        <>
                            <PayoutSalaryDetail
                                salaryList={salaryList}
                                salaryResult={salaryResult}
                                serialNumber={serialNumber}
                            />
                            <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                            />
                        </>
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayoutSalaryWrapper;
