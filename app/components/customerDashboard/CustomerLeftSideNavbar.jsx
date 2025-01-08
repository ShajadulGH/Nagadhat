"use client";
import { getUserDashboard } from "@/app/services/userdashboard/getUserDashboard";
import { NagadhatPublicUrl, removeRequestPath } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import {
    FaAngleRight,
    FaCog,
    FaCreditCard,
    FaGift,
    FaHome,
    FaPoll,
    FaSignOutAlt,
    FaThList,
    FaUser,
    FaWallet,
} from "react-icons/fa";
import {
    FaBangladeshiTakaSign,
    FaMoneyBillTransfer,
    FaTicket,
} from "react-icons/fa6";
import SignoutBtn from "../SignoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "@/app/store/slices/profileSlice";

const CustomerLeftSideNavbar = ({ authSessionData, toggleSidebar }) => {
    const currentPath = usePathname();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isAffiliateUser, setIsAffiliateUser] = useState({});
    const { data: session, status } = useSession();
    const profilePicture = useSelector((state) => state.profile.profilePicture);
    const affiliateStatus = useSelector((state) => state.affiliate.status);
    const dispatch = useDispatch();
    useEffect(() => {
        if (status === "authenticated") {
            const fetchUserDashboardInfo = async () => {
                try {
                    const userDashboardInfo = await getUserDashboard(
                        session?.accessToken
                    );
                    const userDashboardResult = userDashboardInfo?.results;
                    setIsAffiliateUser(userDashboardResult);
                    dispatch(setProfilePicture(userDashboardResult?.profile_picture));
                } catch (error) {
                    console.error(
                        "Failed to fetch user dashboard info:",
                        error
                    );
                }
            };
            fetchUserDashboardInfo();
        }
    }, [status, session]);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const isActive = (href) => currentPath === href;

    useEffect(() => {
        const firstPartOfPath = currentPath.split("-")[0]; // Get the first part of currentPath
        const sanitizedPath = firstPartOfPath.startsWith("/")
            ? firstPartOfPath.slice(1) // Remove the leading "/" if it exists
            : firstPartOfPath; // Use as is if no "/"
        setActiveDropdown(sanitizedPath);
    }, [currentPath]);

    let profilePic;
    if (profilePicture) {
        profilePic = `${NagadhatPublicUrl}/${profilePicture}`;
    } else if (isAffiliateUser?.profile_picture && !profilePicture) {
        profilePic = `${NagadhatPublicUrl}/${isAffiliateUser?.profile_picture}`;
    }else{
        profilePic = "/images/avatar-demo.png"
    }

    return (
        <div className="customer-dashboard-side-nav justify-content-between d-flex flex-column h-100 ">
            <div className="bg-white">
                <div className="p-4 text-center customer-dashboard-profile">
                    <div className="mb-3 customer-dashboard-profile-avatar">
                        <Image
                            className="rounded-circle"
                            src={ profilePic}
                            alt="avatar-demo"
                            width={60}
                            height={60}
                        />
                    </div>
                    <h2>
                        {authSessionData?.user?.name}
                        {/* <span>®</span> */}
                    </h2>
                    <p>{authSessionData?.phone}</p>
                </div>
                <nav className="customer-dashboard-side-navbar bg-white">
                    <ul className="nav flex-column">
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <Link
                                onClick={toggleSidebar}
                                className={`${isActive("/dashboard") ? "activ-link" : ""
                                    } nav-link customer-dashboard-nav-link`}
                                href="/dashboard"
                                scroll={false}
                            >
                                <FaHome className="nav-icon me-2" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <Link
                                onClick={toggleSidebar}
                                className={`${isActive("/orderhistory")
                                    ? "activ-link"
                                    : ""
                                    } nav-link customer-dashboard-nav-link`}
                                href="/orderhistory"
                                scroll={false}
                            >
                                <FaThList className="nav-icon me-2" />
                                Order History
                            </Link>
                        </li>
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <p
                                className={`nav-link customer-dashboard-nav-link dropdown-btn ${activeDropdown === "privilege"
                                    ? "activ-link"
                                    : ""
                                    }`}
                                onClick={() => toggleDropdown("privilege")}
                            >
                                <FaCreditCard className="nav-icon me-2" />
                                Privilege Card
                                <FaAngleRight
                                    className={`dropdown ${activeDropdown === "privilege"
                                        ? "rotate"
                                        : ""
                                        }`}
                                />
                            </p>
                            <ul
                                className={`dropdown-conteiner ${activeDropdown === "privilege" ? "show" : ""
                                    }`}
                            >
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/privilege-card-dashboard"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link customer-dashboard-dropdown-link`}
                                        href="/privilege-card-dashboard"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Privilege Dashboard
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className="dropdown-link customer-dashboard-dropdown-link"
                                        href="/discount-partners-page"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Discount Partner
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/privilege-card-wallet-statement"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link customer-dashboard-dropdown-link`}
                                        href="/privilege-card-wallet-statement"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Wallet Statement
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/privilege-card-rebate-records"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link customer-dashboard-dropdown-link`}
                                        href="/privilege-card-rebate-records"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Rebate History
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {isAffiliateUser?.affiliate_user_status ==
                            "Affiliate" || affiliateStatus ?(
                                <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                                    <p
                                        className={`nav-link customer-dashboard-nav-link dropdown-btn ${activeDropdown === "affiliate"
                                            ? "activ-link"
                                            : ""
                                            }`}
                                        onClick={() => toggleDropdown("affiliate")}
                                    >
                                        <FaWallet className="nav-icon me-2" />
                                        Affiliate
                                        <FaAngleRight
                                            className={`dropdown ${activeDropdown === "affiliate"
                                                ? "rotate"
                                                : ""
                                                }`}
                                        />
                                    </p>
                                    <ul
                                        className={`dropdown-conteiner ${activeDropdown === "affiliate"
                                            ? "show"
                                            : ""
                                            }`}
                                    >
                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive("/affiliate-dashboard")
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-dashboard"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                Affiliate Dashboard
                                            </Link>
                                        </li>
                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive("/affiliate-team")
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-team"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                My Team
                                            </Link>
                                        </li>
                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive("/affiliate-products")
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-products"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                Affiliate Products
                                            </Link>
                                        </li>
                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive(
                                                    "/affiliate-sell-on-nagadhat"
                                                )
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-sell-on-nagadhat"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                Sell On Nagadhat
                                            </Link>
                                        </li>
                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive(
                                                    "/affiliate-rankreward"
                                                )
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-rankreward"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                Ranks & Rewards
                                            </Link>
                                        </li>

                                        <li className="dropdown-item customer-dashboard-dropdown-item">
                                            <Link
                                                onClick={toggleSidebar}
                                                className={`${isActive(
                                                    "/affiliate-terms-condition"
                                                )
                                                    ? "activ-link"
                                                    : ""
                                                    } nav-link customer-dashboard-nav-link`}
                                                href="/affiliate-terms-condition"
                                            >
                                                <span className="dropdown-item-circle"></span>
                                                Terms & Condition
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            ):""}

                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <p
                                className={`nav-link customer-dashboard-nav-link dropdown-btn ${activeDropdown === "payout"
                                    ? "activ-link"
                                    : ""
                                    }`}
                                onClick={() => toggleDropdown("payout")}
                            >
                                <FaBangladeshiTakaSign className="nav-icon me-2" />
                                Payout
                                <FaAngleRight
                                    className={`dropdown ${activeDropdown === "payout"
                                        ? "rotate"
                                        : ""
                                        }`}
                                />
                            </p>
                            <ul
                                className={`dropdown-conteiner ${activeDropdown === "payout" ? "show" : ""
                                    }`}
                            >
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-affiliate-bonus")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-affiliate-bonus"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Affiliate Bonus
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-resale-bonus")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-resale-bonus"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Resell Bonus
                                    </Link>
                                </li>

                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-generation-bonus")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-generation-bonus"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Generation Bonus
                                    </Link>
                                </li>

                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-pending-balance")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-pending-balance"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Pending Balance
                                    </Link>
                                </li>

                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-rank-&-reward")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-rank-&-reward"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Rank & Reward
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/payout-salary")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/payout-salary"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Salary
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <p
                                className={`nav-link customer-dashboard-nav-link dropdown-btn ${activeDropdown === "finance"
                                    ? "activ-link"
                                    : ""
                                    }`}
                                onClick={() => toggleDropdown("finance")}
                            >
                                <FaMoneyBillTransfer className="nav-icon me-2" />
                                Finance
                                <FaAngleRight
                                    className={`dropdown ${activeDropdown === "finance"
                                        ? "rotate"
                                        : ""
                                        }`}
                                />
                            </p>
                            <ul
                                className={`dropdown-conteiner ${activeDropdown === "finance" ? "show" : ""
                                    }`}
                            >
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/finance-transactions")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-transactions"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Transactions
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/finance-transfer")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-transfer"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Transfer
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/finance-transfer-history"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-transfer-history"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Transfer History
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/finance-withdraw")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-withdraw"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Withdraw
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/finance-withdraw-history"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-withdraw-history"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Withdraw History
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/finance-my-bank-details")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-my-bank-details"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        My Payment Information
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/finance-bank-info")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/finance-bank-info"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Company Bank Information
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* <li className="nav-item customer-dashboard-nav-item">
                        <Link
onClick={toggleSidebar}
                            className="nav-link customer-dashboard-nav-link"
                            href="#"
                        >
                            <FaGift className="nav-icon me-2" />
                            My Vouchers
                        </Link>
                    </li> */}
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <Link
                                onClick={toggleSidebar}
                                className={`${isActive("/manage-profile")
                                    ? "activ-link"
                                    : ""
                                    } nav-link customer-dashboard-nav-link`}
                                href="/manage-profile"
                                scroll={false}
                            >
                                <FaUser className="nav-icon me-2" />
                                Manage Profile/KYC
                            </Link>
                        </li>
                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <Link
                                onClick={toggleSidebar}
                                className="nav-link customer-dashboard-nav-link"
                                href="/support"
                            >
                                <FaTicket className="nav-icon me-2" />
                                Support
                            </Link>
                        </li>

                        <li className="nav-item customer-dashboard-nav-item parent-nav-item">
                            <p
                                className={`nav-link customer-dashboard-nav-link dropdown-btn ${activeDropdown === "others"
                                    ? "activ-link"
                                    : ""
                                    }`}
                                onClick={() => toggleDropdown("others")}
                            >
                                {/* <FaCreditCard className="nav-icon me-2" /> */}
                                <IoMdOptions className="nav-icon me-2" />
                                Others
                                <FaAngleRight
                                    className={`dropdown ${activeDropdown === "others"
                                        ? "rotate"
                                        : ""
                                        }`}
                                />
                            </p>
                            <ul
                                className={`dropdown-conteiner ${activeDropdown === "others" ? "show" : ""
                                    }`}
                            >
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive("/others-password-txn-otp")
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/others-password-txn-otp"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Password & TXN OTP
                                    </Link>
                                </li>
                                <li className="dropdown-item customer-dashboard-dropdown-item">
                                    <Link
                                        onClick={toggleSidebar}
                                        className={`${isActive(
                                            "/others-customer-shipping-address"
                                        )
                                            ? "activ-link"
                                            : ""
                                            } nav-link customer-dashboard-nav-link`}
                                        href="/others-customer-shipping-address"
                                    >
                                        <span className="dropdown-item-circle"></span>
                                        Shipping Address
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {status === "authenticated" && (
                            <li className="nav-item customer-dashboard-nav-item">
                                <p className="customer-dashboard-nav-link p-0">
                                    <SignoutBtn />
                                </p>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <Link
                onClick={toggleSidebar}
                className="w-100 add-to-cart-link"
                href="#"
            >
                Be a Seller
            </Link>
        </div>
    );
};

export default CustomerLeftSideNavbar;
