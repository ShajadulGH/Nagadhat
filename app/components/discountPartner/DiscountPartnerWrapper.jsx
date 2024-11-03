"use client";
import dynamic from "next/dynamic";
const FilterCategories = dynamic(() => import("./FilterCategories"), {
    ssr: false,
});
import { useSession } from "next-auth/react";
import DiscountPartnerInfo from "./DiscountPartnerInfo";
import DiscountPartnerTop from "./DiscountPartnerTop";
import { getDiscountPartnerList } from "@/app/services/discountPartner/getDiscountPartnerList";
import { useEffect, useState, useTransition } from "react";
import { getServiceCategoryWithDiscountPartner } from "@/app/services/discountPartner/getServiceCategoryWithDiscountPartner";
import DefaultLoader from "../defaultloader/DefaultLoader";
import NoDataFound from "../NoDataFound";

const DiscountPartnerWrapper = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Category");
    const [partnerData, setPartnerData] = useState([]);
    const [serviceCategory, setServiceCategory] = useState([]);
    const [isPending, startTransition] = useTransition();

    const { data: session } = useSession();

    // getDiscountPartnerList
    useEffect(() => {
        if (!session?.accessToken) return;
        const fetchingPartner = async () => {
            try {
                startTransition(async () => {
                    const categoryToFetch =
                        selectedCategory === "All Category"
                            ? null
                            : selectedCategory;
                    const response = await getDiscountPartnerList(
                        session?.accessToken,
                        categoryToFetch
                    );
                    setPartnerData(response?.results || []);
                });
            } catch (error) {
                console.error("Error fetching partner data", error);
            }
        };
        fetchingPartner();
    }, [session?.accessToken, selectedCategory]);

    // ServiceCategoryWithDiscountPartner
    useEffect(() => {
        if (!session?.accessToken) return;
        const fetchingPartnerCategory = async () => {
            try {
                startTransition(async () => {
                    const response =
                        await getServiceCategoryWithDiscountPartner(
                            session?.accessToken
                        );
                    setServiceCategory(response?.results || []);
                });
            } catch (error) {
                console.error("Error fetching service categories", error);
            }
        };
        fetchingPartnerCategory();
    }, [session?.accessToken]);

    return (
        <div className="container py-5">
            <DiscountPartnerTop />
            <FilterCategories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                serviceCategory={serviceCategory}
            />
            {isPending ? (
                <DefaultLoader />
            ) : (
                <DiscountPartnerInfo partnerData={partnerData} />
            )}
        </div>
    );
};

export default DiscountPartnerWrapper;
