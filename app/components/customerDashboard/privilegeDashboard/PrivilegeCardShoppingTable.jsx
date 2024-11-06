import Image from "next/image";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import DeletePrivilegeCartProduct from "./DeletePrivilegeCartProduct";

const PrivilegeCardShoppingTable = ({
    privilegeCartProduct,
    setRendaringPrice,
    rendaringPrice,
}) => {
    const handleProductIncrement = () => {};
    const handleProductDecrement = () => {};

    return (
        <>
            <div className="table-responsive px-4">
                <table
                    className="table table-bordered border-secondary table-hover table-striped"
                    style={{ minWidth: "750px" }}
                >
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Amount</th>
                            {/* <th scope="col">Net Amount</th> */}
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {privilegeCartProduct?.map((item, index) => {
                            const imageUrl = item?.product_thumbnail
                                ? `${NagadhatPublicUrl}/${item?.product_thumbnail}`
                                : "/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg";
                            const totalPrice =
                                item?.quantity * item?.regular_price;
                            return (
                                <tr key={item?.product_id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image
                                            src={imageUrl}
                                            alt={item?.product_id}
                                            width={60}
                                            height={60}
                                        />
                                    </td>
                                    <td>
                                        <p>
                                            {truncateTitle(
                                                item?.product_name,
                                                40
                                            )}
                                        </p>
                                    </td>
                                    <td>
                                        {item?.regular_price && (
                                            <p>৳ {item?.regular_price}</p>
                                        )}
                                        {item?.mrp_price && (
                                            <del>৳ {item?.mrp_price}</del>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-1 align-items-center justify-content-between">
                                            <button
                                                onClick={() =>
                                                    handleProductIncrement()
                                                }
                                                className="d-flex align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    padding: "0",
                                                }}
                                            >
                                                <FaPlus />
                                            </button>
                                            <div className=" ">
                                                <input
                                                    type="text"
                                                    value={item?.quantity}
                                                    readOnly
                                                    className="border-0 text-center px-1 py-1 bg-transparent fs-5"
                                                    style={{ width: "60px" }}
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleProductDecrement()
                                                }
                                                className="d-flex align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    padding: "0",
                                                }}
                                            >
                                                <FaMinus />
                                            </button>
                                        </div>
                                    </td>
                                    <td>৳ {Number(totalPrice).toFixed(2)}</td>
                                    {/* <td>৳ 175</td> */}
                                    <td>
                                        <DeletePrivilegeCartProduct
                                            setRendaringPrice={
                                                setRendaringPrice
                                            }
                                            rendaringPrice={rendaringPrice}
                                            cartItem={item}
                                        />
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

export default PrivilegeCardShoppingTable;
