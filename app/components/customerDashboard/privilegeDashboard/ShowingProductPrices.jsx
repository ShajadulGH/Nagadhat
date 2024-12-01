const ShowingProductPrices = ({ balanceAfterChoosing }) => {
    return (
        <div className="  d-flex flex-column flex-md-row align-items-center justify-content-between ">
            <div className="fs-5">
                <p>
                    List Choice Balance: ৳ {""}
                    {typeof balanceAfterChoosing?.list_shopping === "number"
                        ? balanceAfterChoosing.list_shopping.toFixed(2)
                        : "0.00"}
                </p>
            </div>
            <div className="fs-5">
                <p>
                    Shopping Balance: ৳ {""}
                    {typeof balanceAfterChoosing?.shopping_balance === "number"
                        ? balanceAfterChoosing.shopping_balance.toFixed(2)
                        : "0.00"}
                </p>
            </div>
        </div>
    );
};

export default ShowingProductPrices;
