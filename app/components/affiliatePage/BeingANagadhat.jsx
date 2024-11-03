import Link from "next/link";
import AffiliateCotumerSlider from "./AffiliateCotumerSlider";
import Image from "next/image";

const BeingANagadhat = () => {
    return (
        <div>
            <div className="container ">
                <div className="row align-items-center ">
                    <div className="col-lg-6 pt-lg-0 pt-4">
                        <div className="pb-4">
                            <h1 className="fs-1">
                                Being a Nagadhat Affiliate Member, Earns for
                                life time.
                            </h1>
                            <p className="fs-5 pb-3">
                                “Share and earn” To create employment and being
                                self sufficient Nagadhat introduce affiliate
                                marketing. Being an affiliate member one can
                                easily earn extra for life long.
                            </p>
                            <div className="d-flex gap-3 align-items-center pt-2 pb-5">
                                <Link
                                    className="add-to-cart-link text-capitalize rounded-2"
                                    href={`/registration`}
                                >
                                    Join Now
                                </Link>
                                <Link
                                    className="affiliate-Learn-More add-to-cart-link text-capitalize rounded-2 "
                                    href="#affiliate-Learn-More"
                                >
                                    Learn More
                                </Link>
                            </div>
                            <AffiliateCotumerSlider />
                        </div>
                    </div>
                    <div className="col-lg-6 pt-lg-0 pt-4">
                        <div className="position-relative">
                            <div
                                className="position-absolute end-0 top-0 rounded-circle p-3 text-white text-center circle-new-updated"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    background: "#44bc9d",
                                }}
                            >
                                <span>New Update</span>
                            </div>
                            <div className="">
                                <Image
                                    width={700}
                                    height={500}
                                    className="img-fluid"
                                    src={`/images/devbook-cover.png`}
                                    alt="image"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeingANagadhat;
