import Image from "next/image";
import { NagadhatPublicUrl } from "@/app/utils";

const OrderProductItems = ({ orderProduct }) => {
    return (
        <>
            <div className="py-2 border-bottom table-responsive order-summary-table-two">
                <table className="order-summary">
                    <tbody>
                        {orderProduct &&
                            orderProduct.length > 0 &&
                            orderProduct.map((productItem, index) => {
                                const {
                                    product_name,
                                    quantity,
                                    regular_price,
                                    product_thumbnail,
                                    unit_price,
                                } = productItem;
                                const imageUrl = `${NagadhatPublicUrl}/${product_thumbnail}`;
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="order-product-img">
                                                <Image
                                                    fill={true}
                                                    src={
                                                        imageUrl
                                                            ? imageUrl
                                                            : null
                                                    }
                                                    alt={
                                                        product_name
                                                            ? product_name
                                                            : `Product Image`
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className="product-cart-text-continer">
                                            {product_name && (
                                                <strong>{product_name}</strong>
                                            )}

                                            {/* <p>
                                                <strong>Size: Large</strong>
                                            </p> */}
                                            {quantity && (
                                                <p>
                                                    <strong>
                                                        Qty: {quantity}
                                                    </strong>
                                                </p>
                                            )}
                                        </td>
                                        <td className="text-end">
                                            {regular_price && (
                                                <strong>৳ {unit_price}</strong>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OrderProductItems;
