
"use client";
import Slider from "react-slick";
import PartnerItems from "./PartnerItems";


function Partner() {
    const partnerStore = [
        {
            path: "https://nagadhat.com.bd",
            imageUrl: "/images/partner/Pocket Slider-01.webp",
            altText: "nagadhat image",
        },
        {
            path: "https://paikarihat.nagadhat.com",
            imageUrl: "/images/partner/Pocket Slider-02.webp",
            altText: "paikarihat image",
        },
        {
            path: "#",
            imageUrl: "/images/partner/Pocket Slider-03.webp",
            altText: "properties image",
        },
        {
            path: "#",
            imageUrl: "/images/partner/Pocket Slider-04.webp",
            altText: "promise image",
        },
    ];

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
         
        ]
      };

    return (
        <section className="nagadhat-partner-area ">
            <div className="container">
                <div className="row g-2 g-lg-3">
                    <Slider {...settings}>
                        {partnerStore.map((item) => (
                            <PartnerItems
                                key={item.altText}
                                optionData={item}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default Partner;
