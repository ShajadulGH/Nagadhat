"use client";
import Image from "next/image";
import Slider from "react-slick";

const AffiliateCotumerSlider = () => {
    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="slider-container affiliate-dummy-info">
            <Slider {...settings}>
                <div>
                    <div
                        className="p-4 fst-italic "
                        style={{
                            background: "#f6f8fc",
                            borderLeft: "4px solid #f5a782",
                        }}
                    >
                        "Once I was a customer of Nagadhat, one day I noticed
                        their affiliate marketing option, since then I am with
                        them. I just love Nagadhat affiliate marketing."
                    </div>
                    <div className="d-flex align-items-center gap-4 pt-4">
                        <div className="">
                            <Image
                                src={`/images/profile-1.png`}
                                width={60}
                                height={60}
                                alt="image"
                            />
                        </div>
                        <div className="">
                            <p>Md. Asaduzzaman</p>
                            <p>Co-Founder, Startup Week</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="p-4 fst-italic "
                        style={{
                            background: "#f6f8fc",
                            borderLeft: "4px solid #f5a782",
                        }}
                    >
                        "I am a Housewife. I love to surf the internet in my
                        household chores leisure. “Nagadhat affiliate marketing”
                        It’s amazing! sharing Ngadahat’s info I am earning and
                        experiencing happiness."
                    </div>
                    <div className="d-flex align-items-center gap-4 pt-4">
                        <div className="">
                            <Image
                                src={`/images/profile-2.png`}
                                width={60}
                                height={60}
                                alt="image"
                            />
                        </div>
                        <div className="">
                            <p>Jerin Khanom</p>
                            <p>Housewife</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="p-4 fst-italic "
                        style={{
                            background: "#f6f8fc",
                            borderLeft: "4px solid #f5a782",
                        }}
                    >
                        "I am a student and also a Nagadhat affiliate marketing
                        member. Whenever without any extra effort you earn a
                        handsome amount it is a different experience. I will ask
                        everyone to join."
                    </div>
                    <div className="d-flex align-items-center gap-4 pt-4">
                        <div className="">
                            <Image
                                src={`/images/profile-1.png`}
                                width={60}
                                height={60}
                                alt="image"
                            />
                        </div>
                        <div className="">
                            <p>Md. Hanjal</p>
                            <p>Student, National University</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default AffiliateCotumerSlider;
