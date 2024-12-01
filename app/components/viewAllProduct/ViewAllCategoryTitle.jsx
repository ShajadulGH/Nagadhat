import FlipClock from "../FlipClock";

const ViewAllCategoryTitle = ({
    title,
    isFlashSaleTimer = false,
    flashSaleEndData,
}) => {
    return (
        <div className="row view-all-product-title">
            <div className="col-md-12 ">
                <div
                    className={`view-all-product-title-box d-flex align-items-center ${
                        isFlashSaleTimer
                            ? "justify-content-between"
                            : "justify-content-center"
                    }`}
                >
                    <h2>{title}</h2>
                    {isFlashSaleTimer &&
                        title === "Flash Sale" &&
                        flashSaleEndData && (
                            <FlipClock
                                endsAt={flashSaleEndData}
                                isflashsalePage={true}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default ViewAllCategoryTitle;
