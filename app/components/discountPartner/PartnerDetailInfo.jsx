import PartnerDetailImage from "./PartnerDetailImage";
import PartnerDetailInfoRight from "./PartnerDetailInfoRight";
import PartnerImageSlider from "./PartnerImageSlider";

const PartnerDetailInfo = ({ partnerDetail }) => {
    return (
        <>
            <PartnerImageSlider partnerDetail={partnerDetail} />
            <div className="row pt-4">
                <PartnerDetailImage partnerDetail={partnerDetail} />
                <PartnerDetailInfoRight partnerDetail={partnerDetail} />
            </div>
        </>
    );
};

export default PartnerDetailInfo;
