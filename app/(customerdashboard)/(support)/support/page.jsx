import Link from "next/link";

const SupportPage = () => {
    return (
        <div className="h-100 customer-dashboard-card">
            <div
                className="d-flex align-items-center justify-content-between px-4 py-3 "
                style={{ background: "#44BC9D", borderRadius: "8px" }}
            >
                <div className="">
                    <h6 className="mb-0 text-white">Support Ticket</h6>
                </div>
                <div className="">
                    <Link
                        href="/add-customer-support-ticket"
                        className="px-3 py-2 text-capitalize fw-bold rounded-3"
                        style={{ background: "rgb(98 239 203)" }}
                    >
                        {" "}
                        Add Tricket
                    </Link>
                </div>
            </div>
            <div className="px-4 py-4">
                <div className="table-responsive ">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">TN</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Note</th>
                                <th scope="col">Image</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>#77579</td>
                                <td>yjghjhasasas</td>
                                <td>hfghgfhasdasa</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/1"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>#77580</td>
                                <td>yjghjhdssds</td>
                                <td>gfrgtr</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/2"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Jacob</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/3"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Jacob</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/4"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Jacob</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/5"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Jacob</td>
                                <td>Image</td>
                                <td>
                                    <span className=" btn btn-warning">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href="/inspect-ticket/6"
                                        className=" btn btn-success"
                                    >
                                        Inspect
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="px-4">
                <h5>Pagination</h5>
            </div>
        </div>
    );
};

export default SupportPage;
