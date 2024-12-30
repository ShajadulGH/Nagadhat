const SaleOnNagadhatRight = ({ responseData }) => {
    return (
        <div className="col-lg-7">
            <div className="position-relative order-summary-row">
                <div
                    className="order-summary-area mx-3 "
                    style={{ paddingLeft: "15px", paddingRight: "15px" }}
                >
                    <div className="border-bottom order-summary-title">
                        <h2>Sale On Nagadhat Info</h2>
                    </div>
                    <div className="order-summary-table-holder">
                        <div className="pt-3 border-bottom table-responsive order-summary-table-one">
                            <div className="" style={{ minWidth: "460px" }}>
                                <div className="d-flex gap-3 justify-content-between px-1 border-bottom thnks-sale-on-nagadhat">
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                Start Date:{" "}
                                            </h6>
                                            <p>{responseData?.start_date}</p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                End Date:{" "}
                                            </h6>
                                            <p>{responseData?.end_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <h6 className="mb-1"> Invoice: </h6>
                                            <p>{responseData?.order_invoice}</p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                Referance No:{" "}
                                            </h6>
                                            <p>
                                                {responseData?.package_invoice}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <h6 className="mb-1"> Status: </h6>
                                            <p>
                                                {responseData?.status === 0
                                                    ? "Active"
                                                    : "Completed"}
                                            </p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                Duration:{" "}
                                            </h6>
                                            <p>{responseData?.duration}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 justify-content-between px-1 pt-3 thnks-sale-on-nagadhat">
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                Trade Price:
                                            </h6>
                                            <p>৳ {responseData?.order_value}</p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                Mrp Price:{" "}
                                            </h6>
                                            <p>৳ {responseData?.mrp_value}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                Approx (monthly sale) Amount:{" "}
                                            </h6>
                                            <p>
                                                ৳{" "}
                                                {responseData?.monthly_bonus.toFixed(
                                                    2
                                                )}
                                            </p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                No of Instalment:
                                            </h6>
                                            <p>{responseData?.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="pb-2">
                                            <p className="mb-1">
                                                {
                                                    responseData?.product
                                                        ?.product_name
                                                }
                                            </p>
                                        </div>
                                        <div className="pb-2">
                                            <h6 className="mb-1">
                                                {" "}
                                                Quantity:{" "}
                                            </h6>
                                            <p>{responseData?.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleOnNagadhatRight;
