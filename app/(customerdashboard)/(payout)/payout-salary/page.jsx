import dynamic from "next/dynamic";
const PayoutSalaryWrapper = dynamic(
    () =>
        import("@/app/components/customerDashboard/payout/PayoutSalaryWrapper"),
    { ssr: false }
);

const payoutSalaryPage = () => {
    return (
        <>
            <PayoutSalaryWrapper />
        </>
    );
};

export default payoutSalaryPage;
