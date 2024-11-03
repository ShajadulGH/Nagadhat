import Link from "next/link";

function MiniNav() {
    return (
        <div className="row">
            <div className="col-12">
                <div className="header-top-area d-flex align-items-center justify-content-between">
                    <div className="header-top-menu-item">
                        <ul className="d-flex align-items-center">
                            <li>
                                <Link
                                    href="/affiliate"
                                    className=" text-white text-capitalize"
                                >
                                    Affiliate
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/career"
                                    className=" text-white text-capitalize"
                                >
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="header-top-menu-item">
                        <ul className="d-flex align-items-center">
                            <li>
                                <Link
                                    href="/merchant"
                                    className=" text-white text-capitalize"
                                >
                                    Merchant
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/discount-partner"
                                    className=" text-white text-capitalize"
                                >
                                    Discount Partner
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniNav;
