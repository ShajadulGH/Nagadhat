import Image from "next/image";
import PartnerItems from "./PartnerItems";

function Partner() {
    const partnerStore = [
        {
            path: "https://nagadhat.com.bd",
            imageUrl: "/images/nagadhat.jpg",
            altText: "nagadhat image",
        },
        {
            path: "https://paikarihat.nagadhat.com",
            imageUrl: "/images/paikarihat.svg",
            altText: "paikarihat image",
        },
        {
            path: "#",
            imageUrl: "/images/properties.svg",
            altText: "properties image",
        },
        {
            path: "#",
            imageUrl: "/images/promise.svg",
            altText: "promise image",
        },
    ];
    return (
        <section className="nagadhat-partner-area">
            <div className="container">
                <div className="row g-2 g-lg-3">
                    {partnerStore.map((item) => {
                        return (
                            <PartnerItems
                                key={item.altText}
                                optionData={item}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Partner;
