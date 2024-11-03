const AffiliateDashboardInfo = ({ affiliateData }) => {
    const {
        cash_balance,
        pending_balance,
        total_referral,
        total_team_members,
        total_resell_amount,
        total_retail_amount,
        total_earning,
        earning_limit,
    } = affiliateData;
    return (
        <>
            <div className="row g-3 customer-dashboard-display-area">
                <div className="col-12 col-xl-3 col-md-6">
                    <div className="balance-area affiliate-display-card">
                        <h3>Wallet</h3>
                        <div className="d-flex flex-column w-100">
                            <div className="flex-1 pb-2 border-bottom ">
                                <h4 className="mb-1">
                                    ট {cash_balance > 0 ? cash_balance : "0"}
                                </h4>
                                <p className="opacity-75">Cash Balance</p>
                            </div>
                            <div className="flex-1 pt-3 ">
                                <h4 className="mb-1">
                                    ট{" "}
                                    {pending_balance > 0
                                        ? pending_balance
                                        : "0"}
                                </h4>
                                <p className="opacity-75">Pending Balance</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-3 col-md-6 h-100">
                    <div className="shopping-alance-area affiliate-display-card h-100">
                        <h3>Team member</h3>
                        <div className="d-flex flex-column w-100">
                            <div className="flex-1 pb-2 border-bottom">
                                <h4 className="mb-1">
                                    {total_referral > 0 ? total_referral : "0"}
                                </h4>
                                <p className="opacity-75">Total Referral</p>
                            </div>
                            <div className="flex-1 pt-3">
                                <h4 className="mb-1">
                                    {total_team_members > 0
                                        ? total_team_members
                                        : "0"}
                                </h4>
                                <p className="opacity-75">Team member</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-3 col-md-6 h-100">
                    <div className="ordered-area affiliate-display-card h-100">
                        <h3>Sell Amount</h3>
                        <div className="d-flex flex-column w-100">
                            <div className="flex-1 pb-2 border-bottom">
                                <h4 className="mb-1">
                                    ট{" "}
                                    {total_resell_amount > 0
                                        ? total_resell_amount
                                        : "0"}
                                </h4>
                                <p className="opacity-75">Resell Amount</p>
                            </div>
                            <div className="flex-1 pt-3">
                                <h4 className="mb-1">
                                    ট{" "}
                                    {total_retail_amount > 0
                                        ? total_retail_amount
                                        : "0"}
                                </h4>
                                <p className="opacity-75">Retail Amount</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-3 col-md-6 h-100">
                    <div className="in-cart-area affiliate-display-card h-100">
                        <h3>Earning Info</h3>
                        <div className="d-flex flex-column w-100">
                            <div className="flex-1 pb-2 border-bottom">
                                <h4 className="mb-1">
                                    ট {total_earning > 0 ? total_earning : "0"}
                                </h4>
                                <p className="opacity-75">Total Earning</p>
                            </div>
                            <div className="flex-1 pt-3">
                                <h4 className="mb-1">
                                    ট {earning_limit > 0 ? earning_limit : "0"}
                                </h4>
                                <p className="opacity-75">Earning Limit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateDashboardInfo;
