"use client";

import { useSearchParams } from "next/navigation";
import AffiliateRetailsProduct from "./AffiliateRetailsProduct";
import ContainerBooking from "./ContainerBooking";
import ResaleProducts from "./ResaleProducts";

const AffiliateProductBody = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";
    return (
        <>
            <div className="tab-content container-booking-body">
                {tab === "retails-tab" && (
                    <AffiliateRetailsProduct isActive={tab === "retails-tab"} />
                )}
                {tab === "container-booking-tab" && (
                    <ContainerBooking
                        isActive={tab === "container-booking-tab"}
                    />
                )}
                {tab === "resale-tab" && (
                    <ResaleProducts isActive={tab === "resale-tab"} />
                )}
                {/* {tab === "properties-tab" && (
                    <div className="p-5">
                        <h1 className="text-center">
                            Properties content goes here.
                        </h1>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default AffiliateProductBody;
