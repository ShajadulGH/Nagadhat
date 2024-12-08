import WalletStatementWrapper from "@/app/components/customerDashboard/privilegeDashboard/WalletStatementWrapper";

const WalletStatementPage = ({ searchParams }) => {
    return (
        <>
            <WalletStatementWrapper searchParams={searchParams} />
        </>
    );
};

export default WalletStatementPage;
