import Link from "next/link";
import { FaPhone } from "react-icons/fa6";

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
                                    Affiliate Page
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
                    <div className="header-top-menu-item">
                        <ul className="d-flex align-items-center">
                            <li>
                                <a
                                    href="tel:09647444444"
                                    className=" text-white text-capitalize"
                                >
                                    <FaPhone className="pe-1"/> 09647 444 444
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniNav;
