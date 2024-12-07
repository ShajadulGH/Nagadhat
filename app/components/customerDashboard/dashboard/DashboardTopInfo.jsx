const DashboardTopInfo = ({ userDashboard }) => {
    return (
        <>
            <div className="customer-dashboard-card">
                <div className="customer-dashboard-title-bar">
                    <div>
                        <h1 className="customer-dashboard-title">Dashboard</h1>
                    </div>
                    <div className="fs-4">
                        <i className="fa-solid fa-bell"></i>
                    </div>
                </div>
                <div className="row g-3 mb-4 customer-dashboard-display-area">
                    <div className="col-6 col-md-3">
                        <div className="balance-area">
                            <h3>
                                {userDashboard?.wallet
                                    ? userDashboard?.wallet
                                    : "0"}
                            </h3>
                            <p className="opacity-50">Withdrawable Amount</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="shopping-alance-area">
                            <h3>
                                {userDashboard?.shopping_balance
                                    ? userDashboard?.shopping_balance
                                    : "0"}
                            </h3>
                            <p className="opacity-50">Shopping Balance</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="ordered-area">
                            <h3>
                                {userDashboard?.order
                                    ? userDashboard?.order
                                    : "0"}
                            </h3>
                            <p className="opacity-50">Ordered</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="in-cart-area">
                            <h3>
                                {userDashboard?.cart
                                    ? userDashboard?.cart
                                    : "0"}
                            </h3>
                            <p className="opacity-50">In Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardTopInfo;
