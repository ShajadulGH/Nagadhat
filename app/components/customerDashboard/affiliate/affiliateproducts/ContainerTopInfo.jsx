import moment from "moment";

const ContainerTopInfo = ({ containerData }) => {
    const {
        id,
        container_name,
        container_value,
        quantity,
        opening_time,
        closing_time,
        item_categories,
    } = containerData;

    // Format the opening and closing time
    const formattedOpeningTime = moment(opening_time).format("DD MMMM YYYY");
    const formattedClosingTime = moment(closing_time).format("DD MMMM YYYY");

    return (
        <>
            <div className="d-flex justify-content-between container-booking-section-headr flex-column flex-md-row gap-3 align-items-center">
                <div className="container-booking-banner">
                    <img src="/images/Contener.png" alt="hello" />
                </div>
                <div className="container-booking-section-headr-left">
                    <table>
                        <tbody>
                            <tr>
                                <td>Container Name</td>
                                <td className="px-5">:</td>
                                <td className="text-end">{container_name}</td>
                            </tr>
                            <tr>
                                <td>Container Value</td>
                                <td className="px-5">:</td>
                                <td className="text-end">{container_value}</td>
                            </tr>
                            <tr>
                                <td>Item</td>
                                <td className="px-5">:</td>
                                {item_categories?.map((items, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className="text-end d-flex gap-2 flex-wrap "
                                        >
                                            <span
                                                className="px-2 w-100 text-white rounded text-center"
                                                style={{
                                                    background: "#44bc9d",
                                                }}
                                            >
                                                {items ? items : "...."}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td className="px-5">:</td>
                                <td className="text-end">{quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-between container-booking-date-section flex-column flex-md-row gap-2">
                <p className="">Open Date : {formattedOpeningTime}</p>
                <p className="">Close Date : {formattedClosingTime}</p>
            </div>
        </>
    );
};

export default ContainerTopInfo;
