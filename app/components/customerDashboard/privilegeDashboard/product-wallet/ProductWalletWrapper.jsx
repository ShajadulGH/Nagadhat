import ProductWallet from "./ProductWallet";

const ProductWalletWrapper = () => {
    return (
        <>
            <div className="customer-dashboard-order-history-area  ">
                <div className="customer-dashboard-order-history-title">
                    <h4 className="mb-0">Product Wallet</h4>
                </div>
                <ProductWallet />
            </div>
        </>
    );
};

export default ProductWalletWrapper;
