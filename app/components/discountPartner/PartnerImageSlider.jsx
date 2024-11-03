"use client";
import Slider from "react-slick";
import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const PartnerImageSlider = ({ partnerDetail }) => {
    const partnerGallery = partnerDetail?.gallery || [];

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="row  pb-5">
            <div className="col-md-12 partner_Images_slider">
                <Slider {...settings}>
                    {partnerGallery.length > 0 ? (
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
                                            height: "350px",
                                        }}
                                    >
                                        <Image
                                            fill
                                            className="img-fluid"
                                            src={galleryImageUrl}
                                            alt="Gallery Image"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No gallery images available</div>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default PartnerImageSlider;
