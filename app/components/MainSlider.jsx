"use client";
import Slider from "react-slick";
import MainSliderItems from "./MainSliderItems";

const MainSlider = ({ sliderOptionData }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
    };
    return (
        <div className="hero-slider-holder hero-slider-main-item">
            <Slider {...settings}>
                {sliderOptionData.map((item) => (
                    <MainSliderItems key={item.id} sliderItem={item} />
                ))}
            </Slider>
        </div>
    );
};

export default MainSlider;
