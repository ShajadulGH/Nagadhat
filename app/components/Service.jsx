import ServiceItems from "./ServiceItems";

const Service = () => {
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
        <div className="container">
            <div className="nh-service-area">
                <div className="row">
                    <div className="col-md-12">
                        <div className="nh-service-box">
                            {
                                serviceItems.map((item) => {
                                    const { imageurl, altText, title, subTitle } = item;
                                    return (
                                        <ServiceItems key={title} imageurl={imageurl} altText={altText} title={title} subTitle={subTitle} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service