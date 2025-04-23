import { FaArrowCircleRight } from "react-icons/fa";

const OrderViewTimeLine = ({ orderStatus }) => {
    
    return (
        <>
            <div className="row order-view-product-detail d-flex justify-content-center mt-70 mb-70">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title order-timeline-title">
                                Order Timeline
                            </h5>
                            <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                {
                                    orderStatus.map((statusItem) => {
                                        const {
                                            id,
                                            status,
                                            time,
                                            date,
                                            order_status_note,
                                            payment_status,
                                            payment_status_note
                                        } = statusItem;
                                        return (
                                            <div
                                                key={id}
                                                className="vertical-timeline-item vertical-timeline-element"
                                            >
                                                <div>
                                                    <span className="vertical-timeline-element-icon bounce-in">
                                                        <FaArrowCircleRight />
                                                    </span>
                                                    <div className="vertical-timeline-element-content bounce-in">
                                                        <h4
                                                            className={`timeline-title ${
                                                                status ===
                                                                "Canceled"
                                                                    ? "text-danger"
                                                                    : "text-info"
                                                            }`}
                                                        >
                                                            {status ? (status):(payment_status)}
                                                        </h4>
                                                        <p>
                                                            {order_status_note ? (order_status_note):(payment_status_note)}
                                                        </p>
                                                        <span className="vertical-timeline-element-date">
                                                            {time ? time : null}
                                                        </span>
                                                        <span className="vertical-timeline-element-date-time">
                                                            {date ? date : null}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderViewTimeLine;
