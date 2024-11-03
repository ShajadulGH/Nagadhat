"use client";
import DiscountPartnerBasicInfo from "../components/discountPartner/DiscountPartnerBasicInfo";
import DiscountPartnerBusinessInfo from "../components/discountPartner/DiscountPartnerBusinessInfo";
import DiscountPartnerContactInfo from "../components/discountPartner/DiscountPartnerContactInfo";
import { useSearchParams } from "next/navigation";
import { DiscountPartnerTabTitle } from "../components/discountPartner/DiscountPartnerTabTitle";
import { useState } from "react";
import Image from "next/image";
import banner from "@/public/images/discount-partner-2.jpg";

const DiscountPartner = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "basic-info";

    const handleTabClick = (tabId) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("tab", tabId);
        window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${newSearchParams.toString()}`
        );
    };
    const [formData, setFormData] = useState({
        company_name: "",
        owner_name: "",
        location: "",
        service_category: "",
        logo: null,
        gallery: [],
        business_contact_number: "",
        business_email: "",
        responsible_person_name: "",
        responsible_person_contact: "",
        responsible_person_email: "",
        trade_license_number: "", // Trade License Number
        tin_vat: "", // TIN / VAT
        facebook_link: "", // Facebook Link
        website_link: "", // Website Link
        applicability: "", // Applicability
        offer_details: "", // offer details
        company_brief: "", // Company brief
        trade_license_copy: null, // Trade License Copy (file)
        tin_vat_copy: null, // TIN / VAT Copy (file)
        chack:false
    });

    return (
        <div className="my-5">
            <div className="customer-manage-profile-info container">
                <div className="w-100">
                    <Image className="w-100 h-100" src={banner} alt="" />
                </div>
                <DiscountPartnerTabTitle handleTabClick={handleTabClick} />
                <div className="tab-content container-booking-body">
                    {tab === "basic-info" && (
                        <DiscountPartnerBasicInfo
                            isActive={tab === "basic-info"}
                            handleTabClick={handleTabClick}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                    {tab === "contact-info" && (
                        <DiscountPartnerContactInfo
                            isActive={tab === "contact-info"}
                            handleTabClick={handleTabClick}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                    {tab === "business-info" && (
                        <DiscountPartnerBusinessInfo
                            isActive={tab === "business-info"}
                            handleTabClick={handleTabClick}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiscountPartner;
