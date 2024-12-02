
"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <section className="nagadhat-partner-area">
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
