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

const PayoutSalaryWrapper = () => {
    const [salaryResult, setSalaryResult] = useState(null);
    const [salaryList, setSalaryList] = useState([]);
    const [salarySearch, setSalarySearch] = useState("");
    const [isPending, startTransition] = useTransition();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            const fetchSalary = async () => {
                try {
                    startTransition(async () => {
                        const params = { search: salarySearch };
                        const response = await getAffiliateSalary(
                            session.accessToken,
                            params
                        );
                        setSalaryResult(response?.results || {});
                        setSalaryList(response?.results?.salary_list || []);
                    });
                } catch (error) {
                    console.error("Error fetching salary info:", error);
                }
            };
            fetchSalary();
        }
    }, [session?.accessToken, salarySearch]);

    const hasSalary = salaryResult && Object.keys(salaryResult).length > 0;
    console.log("hasSalary", hasSalary);

    return (
        <div className="customer-dashboard-order-history-area h-100 pb-4">
            <div className="customer-dashboard-order-history-area">
                <PayoutSalaryTop />
                <div className="customer-dashboard-order-history p-0 py-4">
                    {isPending ? (
                        <LodingFixed />
                    ) : hasSalary ? (
                        <>
                            <PayoutSalaryDate salaryResult={salaryResult} />
                            <PayoutSearchForm
                                searchTerm={salarySearch}
                                setSearchTerm={setSalarySearch}
                            />
                            <PayoutSalaryDetail
                                salaryList={salaryList}
                                salaryResult={salaryResult}
                            />
                        </>
                    ) : (
                        <NoDataFound />
                    )}
                </div>
                {hasSalary && <p className="ps-4">pagination</p>}
            </div>
        </div>
    );
};

export default PayoutSalaryWrapper;
