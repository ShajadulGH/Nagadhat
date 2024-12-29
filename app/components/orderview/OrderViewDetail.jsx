import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

const OrderViewDetail = ({ orderProduct }) => {
    return (
        <>
            <div className="card mt-3">
                <div className="card-header">
                    <b className="fs-15">Order Details</b>
                </div>
                <div className="card-body pb-0">
                    <div className="table-responsive">
                        <table className="table table-borderless table-responsive">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th width="30%">Title</th>
                                    <th>Quantity</th>
                                    <th>Vendor Name</th>
                                    <th>Delivery Partner</th>
                                    <th>Price</th>
                                    {/* <th>Return</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {orderProduct.length > 0 ? (
                                    orderProduct.map((items, index) => {
                                        const {
                                            id,
                                            product_name,
                                            quantity,
                                            unit_price,
                                            delivery_partner,
                                        } = items;
                                        const imageUrl = `${NagadhatPublicUrl}/${items?.product_thumbnail}`;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Image
                                                        className="rounded"
                                                        src={imageUrl}
                                                        width={60}
                                                        height={60}
                                                        alt={product_name}
                                                    />
                                                </td>
                                                <td>
                                                    <Link href="#">
                                                        {product_name}
                                                    </Link>
                                                </td>
                                                <td>{Math.round(quantity)}</td>
                                                <td>Nagadhat</td>
                                                <td>
                                                    {delivery_partner
                                                        ? delivery_partner
                                                        : "--"}
                                                </td>
                                                <td>৳ {unit_price}</td>
                                                {/* <td>
                                                    <button className="btn btn-danger">
                                                        Return
                                                    </button>
                                                </td> */}
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>
                                            <h1>Data not found</h1>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderViewDetail;
