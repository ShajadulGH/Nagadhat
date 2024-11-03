import WalletStatementData from "./WalletStatementData";

const WalletStatementWrapper = () => {
    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Statement</h4>
            </div>
            <WalletStatementData />
        </div>
    );
};

export default WalletStatementWrapper;
