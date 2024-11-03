import Image from "next/image";
import Service from "../Service";
import WelcomeImg from "./WelcomeImg";
import EasySellStepImg from "./EasySellStepImg";
import ShouldISellTheNagadhatImg from "./ShouldISellTheNagadhatImg";
import StartSellingImg from "./StartSellingImg";
import ReferSellerImg from "./ReferSellerImg";
import MerchantVideo from "./MerchantVideo";
import GetLoans from "./GetLoans";
import MerchantVisitNow from "./MerchantVisitNow";

const MerchantWrapper = () => {
    const serviceItems = [
        {
            imageurl: "/images/pickup.svg",
            altText: "pickup image",
            title: " Fast Delivery",
            subTitle: "Free For All Type Order",
        },
        {
            imageurl: "/images/gift-cart.svg",
            altText: "gift cart",
            title: " Best Quality",
            subTitle: "Best Product Peices",
        },
        {
            imageurl: "/images/gift-box.svg",
            altText: "gift box",
            title: " Exchange Offer",
            subTitle: "One Day To Changes",
        },
        {
            imageurl: "/images/headphone.svg",
            altText: "headphone",
            title: "  Help Center",
            subTitle: "Support System 24/7",
        },
    ];
    return (
        <>
            <div className="container pt-5">
                <WelcomeImg />
                <EasySellStepImg />
                <ShouldISellTheNagadhatImg />
                <StartSellingImg />
                <ReferSellerImg />
                <MerchantVideo />
                <GetLoans />
                <MerchantVisitNow />
            </div>
            <div className="pb-4 merchant-top-space">
                <Service />
            </div>
        </>
    );
};

export default MerchantWrapper;
