import React from "react";

const ResaleCondition = ({ productInfo }) => {
    // fast_moving_duration
    return (
        <div className="d-flex flex-column gap-1">
            <div>
                <h3 className="fs-5 fw-bold">Minimum Quantity</h3>
                <p>
                    {productInfo?.min_quantity
                        ? productInfo?.min_quantity
                        : "No minimum quantity set"}
                </p>
            </div>
            <div>
                <h3 className="fs-5 fw-bold">Duration</h3>
                <p>
                    {productInfo?.fast_moving_duration
                        ? `After ${productInfo.fast_moving_duration} Months`
                        : "Duration not available"}
                </p>
            </div>
        </div>
    );
};

export default ResaleCondition;
