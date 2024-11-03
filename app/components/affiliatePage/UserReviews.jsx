import Image from "next/image";
import Link from "next/link";
import { FaQuoteRight } from "react-icons/fa";

const UserReviews = () => {
    return (
        <>
            <div className="row justify-content-center pb-5">
                <div className="col-md-12  text-center">
                    <h2 className="fs-1 mb-0">User Reviews</h2>
                    <p className="fs-5">See what our users are saying.</p>
                </div>
            </div>

            <div className="pb-5 row justify-content-center row-gap-5 gx-3">
                <div className="col-md-4 col-sm-6 col-12">
                    <div
                        className="position-relative h-100 shadow-sm rounded-4 p-4"
                        style={{ background: "#f6f8fc" }}
                    >
                        <div
                            className="position-absolute start-50  top-0 text-center translate-middle rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "#44bc9d",
                                width: "36px",
                                height: "36px",
                                lineHeight: "36px",
                            }}
                        >
                            <FaQuoteRight className="text-white" />
                        </div>
                        <div className="">
                            <p className="pb-3">
                                "The Greatest Experience ever! When you
                                unexpectedly get some income. I am with nagadhat
                                as an affiliate marketer. At first I was
                                confused about how to work/ But with time I am
                                just loving it."
                            </p>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="">
                                    <Image
                                        src={`/images/profile-1.png`}
                                        className="img-fluid rounded-circle"
                                        width={80}
                                        height={80}
                                        alt="image"
                                    />
                                </div>
                                <div className=" d-flex flex-column">
                                    <span>Md. Asaduzzaman</span>
                                    <span>Co-Founder, Startup Week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div
                        className="position-relative h-100 shadow-sm rounded-4 p-4"
                        style={{ background: "#f6f8fc" }}
                    >
                        <div
                            className="position-absolute start-50  top-0 text-center translate-middle rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "#44bc9d",
                                width: "36px",
                                height: "36px",
                                lineHeight: "36px",
                            }}
                        >
                            <FaQuoteRight className="text-white" />
                        </div>
                        <div className="">
                            <p className="pb-3">
                                "It's amazing! Earlier I was just surfing the
                                internet for fun, now I am doing it to earn
                                money. Thanks Nagadhat affiliate marketing
                                thinking"
                            </p>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="">
                                    <Image
                                        src={`/images/profile-2.png`}
                                        className="img-fluid rounded-circle"
                                        width={80}
                                        height={80}
                                        alt="image"
                                    />
                                </div>
                                <div className=" d-flex flex-column">
                                    <span>Jerin Khanom</span>
                                    <span>Housewife, Comilla</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div
                        className="position-relative h-100 shadow-sm rounded-4 p-4"
                        style={{ background: "#f6f8fc" }}
                    >
                        <div
                            className="position-absolute start-50  top-0 text-center translate-middle rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "#44bc9d",
                                width: "36px",
                                height: "36px",
                                lineHeight: "36px",
                            }}
                        >
                            <FaQuoteRight className="text-white" />
                        </div>
                        <div className="">
                            <p className="pb-3">
                                "I never thought I could earn from my house
                                without doing any extra effort! I am a housewife
                                and also a proud nagadhat affiliate marketing
                                member."
                            </p>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="">
                                    <Image
                                        src={`/images/profile-3.png`}
                                        className="img-fluid rounded-circle"
                                        width={80}
                                        height={80}
                                        alt="image"
                                    />
                                </div>
                                <div className=" d-flex flex-column">
                                    <span>Md. Hanjal</span>
                                    <span>Student, National University</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div
                        className="position-relative h-100 shadow-sm rounded-4 p-4"
                        style={{ background: "#f6f8fc" }}
                    >
                        <div
                            className="position-absolute start-50  top-0 text-center translate-middle rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "#44bc9d",
                                width: "36px",
                                height: "36px",
                                lineHeight: "36px",
                            }}
                        >
                            <FaQuoteRight className="text-white" />
                        </div>
                        <div className="">
                            <p className="pb-3">
                                "In this pandemic situation, I am doing my
                                online study. Besides this I am with Nagadhat
                                affiliates and getting some extra pocket money."
                            </p>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="">
                                    <Image
                                        src={`/images/profile-4.png`}
                                        className="img-fluid rounded-circle"
                                        width={80}
                                        height={80}
                                        alt="image"
                                    />
                                </div>
                                <div className=" d-flex flex-column">
                                    <span>Mrs. Sagorika</span>
                                    <span>Self-employed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div
                        className="position-relative h-100 shadow-sm rounded-4 p-4"
                        style={{ background: "#f6f8fc" }}
                    >
                        <div
                            className="position-absolute start-50  top-0 text-center translate-middle rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "#44bc9d",
                                width: "36px",
                                height: "36px",
                                lineHeight: "36px",
                            }}
                        >
                            <FaQuoteRight className="text-white" />
                        </div>
                        <div className="">
                            <p className="pb-3">
                                "Thanks to Nagadhat affiliate Marketing idea. I
                                am a private job holder. Once I was only
                                customer but now I am also their affiliates and
                                earning extra."
                            </p>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="">
                                    <Image
                                        src={`/images/profile-5.png`}
                                        className="img-fluid rounded-circle"
                                        width={80}
                                        height={80}
                                        alt="image"
                                    />
                                </div>
                                <div className=" d-flex flex-column">
                                    <span>Md. Samsuddin</span>
                                    <span>Small Business Owner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-4 row justify-content-center">
                <div className="col-md-12 text-center">
                    <div className="d-flex align-content-center justify-content-center pb-2">
                        <Link
                            href={`/registration`}
                            className="add-to-cart-link rounded-2 border-0 text-capitalize w-auto d-inline "
                        >
                            Join Today
                        </Link>
                    </div>

                    <p>* Read our terms and conditions</p>
                </div>
            </div>
        </>
    );
};

export default UserReviews;
