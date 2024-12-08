"use client";
import Slider from "react-slick";
import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const PartnerImageSlider = ({ partnerDetail }) => {
    const partnerGallery = partnerDetail?.gallery || [];

    const settings = {
        dots: partnerGallery.length > 1 ? true : false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="row pb-2 pb-md-3">
            <div className="col-md-12 partner_Images_slider">
                <Slider {...settings}>
                    {partnerGallery?.length > 0 ? (
                        partnerGallery.map((gallery) => {
                            const { id, image } = gallery;
                            const galleryImageUrl = image
                                ? `${NagadhatPublicUrl}/${image}`
                                : `/images/placeholder--image.jpg`;
                            return (
                                <div key={id}>
                                    <div
                                        className=" position-relative"
                                        style={{
                                            width: "1300px",
                                            height: "250px",
                                        }}
                                    >
                                        <Image
                                            fill
                                            src={galleryImageUrl}
                                            alt="Gallery Image"
                                            style={{ objectFit: "fill" }}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="discount-partners-banner-height">
                            <Image
                                src="/images/placeholder--image.jpg"
                                alt="Placeholder"
                                width={1300}
                                className="img-fluid"
                                height={250}
                                style={{ objectFit: "fill" }}
                            />
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default PartnerImageSlider;
