import Link from "next/link";
import CopyRight from "./CopyRight";
import FooterAddress from "./FooterAddress";
import FooterLogo from "./FooterLogo";
import Paywith from "./Paywith";
import QuickLinks from "./QuickLinks";
import SocialLink from "./SocialLink";
import Subscribe from "./Subscribe";
import LoginModal from "../login/LoginModal";

function Footer() {
    const linkListsOptionOne = [
        { title: "About Us", path: "about-us" },
        { title: "FAQ", path: "faq" },
        { title: "Support", path: "#" },
        { title: "Terms & Conditions", path: "#" },
        { title: "Quiz", path: "#" },
    ];
    const myAccoutOptions = [
        { title: "Login", path: "/login" },
        { title: "Be an Affiliate", path: "/affiliate" },
        { title: "Be a Merchant", path: "/merchant" },
        { title: "Discount Partner", path: "/discount-partner" },
    ];

    const socialLinkItem = [
        {
            image: "/images/facbook.svg",
            alt: "facbook",
            path: "https://www.facebook.com/nagadhat",
        },
        { image: "/images/twitter.svg", alt: "twitter", path: "#" },
        { image: "/images/linkedin.svg", alt: "linkedin", path: "#" },
        { image: "/images/youtube.svg", alt: "youtube", path: "#" },
        { image: "/images/instagram.svg", alt: "instagram", path: "#" },
    ];

    return (
        <footer>
            <div className="container">
                <div className="row footer-widget-row">
                    <div className="col-xl-7">
                        <div className="row footer-widget-inner">
                            <div className="col-md-6 footer-widget">
                                <FooterLogo />
                                <div className="footer-widget-info text-white">
                                    <SocialLink
                                        socialLinkItem={socialLinkItem}
                                    />
                                    <Subscribe />
                                </div>
                            </div>
                            <div className="col-md-6 footer-widget text-white">
                                <QuickLinks title="Contact Info">
                                    <div className="footer-widget-address">
                                        <FooterAddress
                                            icon="/images/call-footer.svg"
                                            title="Call Us"
                                            subtitle="09647 444 444"
                                        />
                                        <FooterAddress
                                            icon="/images/location-footer.svg"
                                            title="Address"
                                            subtitle="Khaja Super Market, 2nd to 7th Floor, Kallyanpur  Bus Stop, Mirpur Road, Dhaka-1207."
                                        />
                                    </div>
                                </QuickLinks>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="row footer-widget footer-widget-last">
                            <div className="col-md-4 col-6">
                                <QuickLinks
                                    title="Quick Links"
                                    option={linkListsOptionOne}
                                />
                            </div>
                            <div className="col-md-4 col-6">
                                <QuickLinks
                                    title="My Account"
                                    option={myAccoutOptions}
                                />
                            </div>
                            <div className="col-md-4 col-12">
                                <QuickLinks title="Be A Seller">
                                    <div className="applay-now-btn">
                                        <Link href="#">APPLY NOW</Link>
                                    </div>
                                </QuickLinks>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row payment-method-row">
                    <Paywith />
                </div>
                <CopyRight />
            </div>
            <LoginModal />
        </footer>
    );
}

export default Footer;
