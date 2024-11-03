import Image from "next/image";
import { TfiClose } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const PrivilegeCardShoppingTable = () => {
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
                            <th scope="col">Net Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <Image
                                    src={`/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg`}
                                    alt="image"
                                    width={60}
                                    height={60}
                                />
                            </td>
                            <td>
                                <p>Maggi Masala 620gm (8Pcs) Free 2 pcs</p>
                            </td>
                            <td>৳ 175</td>
                            <td>
                                <div className="d-flex gap-1 align-items-center justify-content-between">
                                    <button
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
                                            defaultValue="1"
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "40px" }}
                                        />
                                    </div>
                                    <button
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
                            <td>৳ 175</td>
                            <td>৳ 175</td>
                            <td>
                                <button className="border-0 add-to-cart-link rounded-2">
                                    Add
                                </button>
                                {/* <button className="btn btn-danger">
                                    <TfiClose />
                                </button> */}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Image
                                    src={`/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg`}
                                    alt="image"
                                    width={60}
                                    height={60}
                                />
                            </td>
                            <td>
                                <p>Maggi Masala 620gm (8Pcs) Free 2 pcs</p>
                            </td>
                            <td>৳ 175</td>
                            <td>
                                <div className="d-flex gap-1 align-items-center justify-content-between">
                                    <button
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
                                            defaultValue="1"
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "40px" }}
                                        />
                                    </div>
                                    <button
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
                            <td>৳ 175</td>
                            <td>৳ 175</td>
                            <td>
                                <button className="border-0 add-to-cart-link rounded-2">
                                    Add
                                </button>
                                {/* <button className="btn btn-danger">
                                    <TfiClose />
                                </button> */}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Image
                                    src={`/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg`}
                                    alt="image"
                                    width={60}
                                    height={60}
                                />
                            </td>
                            <td>
                                <p>Maggi Masala 620gm (8Pcs) Free 2 pcs</p>
                            </td>
                            <td>৳ 175</td>
                            <td>
                                <div className="d-flex gap-1 align-items-center justify-content-between">
                                    <button
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
                                            defaultValue="1"
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "40px" }}
                                        />
                                    </div>
                                    <button
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
                            <td>৳ 175</td>
                            <td>৳ 175</td>
                            <td>
                                <button className="border-0 add-to-cart-link rounded-2">
                                    Add
                                </button>
                                {/* <button className="btn btn-danger">
                                    <TfiClose />
                                </button> */}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <Image
                                    src={`/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg`}
                                    alt="image"
                                    width={60}
                                    height={60}
                                />
                            </td>
                            <td>
                                <p>Maggi Masala 620gm (8Pcs) Free 2 pcs</p>
                            </td>
                            <td>৳ 175</td>
                            <td>
                                <div className="d-flex gap-1 align-items-center justify-content-between">
                                    <button
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
                                            defaultValue="1"
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "40px" }}
                                        />
                                    </div>
                                    <button
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
                            <td>৳ 175</td>
                            <td>৳ 175</td>
                            <td>
                                <button className="border-0 add-to-cart-link rounded-2">
                                    Add
                                </button>
                                {/* <button className="btn btn-danger">
                                    <TfiClose />
                                </button> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PrivilegeCardShoppingTable;
