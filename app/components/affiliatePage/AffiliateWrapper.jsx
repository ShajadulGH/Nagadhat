import Service from "../Service";
import BeingANagadhat from "./BeingANagadhat";
import ExperienceSignUp from "./ExperienceSignUp";
import GenerateIncome from "./GenerateIncome";
import KeyFeatures from "./KeyFeatures";
import UserReviews from "./UserReviews";
import WhoCanBeNagadhat from "./WhoCanBeNagadhat";

const AffiliateWrapper = () => {
    return (
        <>
            <BeingANagadhat />

            <div
                className=""
                style={{ background: "#f2f3f5" }}
                id="affiliate-Learn-More"
            >
                <div className="container">
                    <GenerateIncome />
                    <KeyFeatures />
                    <WhoCanBeNagadhat />
                    <ExperienceSignUp />
                    <UserReviews />
                    <div className="affiliate-direct-top-space">
                        <Service />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateWrapper;
