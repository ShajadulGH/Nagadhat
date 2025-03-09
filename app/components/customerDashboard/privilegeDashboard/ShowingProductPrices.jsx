const ShowingProductPrices = ({ balanceAfterChoosing }) => {
    return (
        <div className="mt-4 d-flex flex-column flex-md-row align-items-center justify-content-between ">
            <div className="fs-5">
                <p>
                    List Choice Balance: ৳ {""}
                    {balanceAfterChoosing?.list_shopping || "0.00"}
                </p>
            </div>
            <div className="fs-5">
                <p>
                    Shopping Balance: ৳ {""}
                    {balanceAfterChoosing?.shopping_balance || "0.00"}
                </p>
            </div>
        </div>
    );
};

export default ShowingProductPrices;
