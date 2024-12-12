import Image from 'next/image';
import banner from "@/public/images/about-us-bannar.jpg";
import Link from 'next/link';

const AboutUs = () => {
    return (
        <div className="wrapper-area" style={{ backgroundColor: '#eee' }}>
            <section className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Image
                                src={banner}
                                alt="About Us banner"
                                style={{ aspectRatio: "3/1", width: '100%', height: "auto" }}
                                width={1300}
                                height={450}
                            />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <h1 className="text-center py-4" style={{ fontWeight: 'bold', color: '#44bc9d' }}>
                            About Us
                        </h1>
                    </div>
                    <div className="row intro">
                        <div className="container">
                            <div className="row gx-5">
                                <div className="col-md-6 introduction d-flex flex-column gap-3">
                                    <h3 className="text-center">Introduction</h3>
                                    <p>
                                        In this age of the heyday of information technology, the conventional methods and ideas of business have changed radically. The unimaginable breadth of information technology and the availability of various digital devices (smart phones / laptops / computers) have given an incredible momentum to our daily activities and lifestyles.
                                        E-commerce has become popular as a sophisticated business platform around the world due to the availability and rapid expansion of internet and technology based products.
                                    </p>
                                    <p>
                                        Online shopping or e-commerce is a very popular platform in Bangladesh today as well as all over the world due to global epidemics, natural disasters, unbearable traffic jams, and busy schedules of urban life.
                                        E-Commerce is now expanding rapidly in Bangladesh as well.
                                    </p>
                                    <p>
                                        With the great conviction of fulfilling the dream of Digital Bangladesh and fulfilling the demands of the time, <span className='fw-bold'>"Nagadhat Bangladesh Limited"</span> has started its journey through which the customers are getting an endless opportunity to purchase desirable and quality products at an affordable price.
                                    </p>
                                    <p>
                                        Nagadhat started its journey with a commitment to provide world-class e-commerce services to customers by overcoming the weaknesses of existing e-commerce services in Bangladesh. Due to its unparalleled and unique features, Nagadhat deserves to be established as an ideal online platform.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <div className="row g-3">
                                        <div className="col-md-12 d-flex flex-column gap-2">
                                            <h3>Mission</h3>
                                            <p>
                                                Achieving maximum satisfaction by delivering local and international products at reasonable prices to the customer within the stipulated time and benefit the customer financially through affiliate services; the journey of <span className='fw-bold'>"Nagadhat Bangladesh Limited"</span> started with the firm conviction of making the unemployed self-reliant and creating new entrepreneurs.
                                            </p>
                                        </div>
                                        <div className="col-md-12 flex-column gap-2">
                                            <h3 className='pb-2'>Vision</h3>
                                            <ul className='g-2 list-group d-flex flex-column gap-2' style={{ listStyle: "", listStyleType: "square" }}>
                                                <li>
                                                    <span className='fw-bold'>"Nagadhat Bangladesh Limited"</span> will provide goods and services to the general public through it’s e-commerce platform and will set up its own service points in 64 districts by 2022.
                                                </li>
                                                <li>
                                                    To make at least 50,000 people economically self-sufficient by 2025 and to create at least 10,000 entrepreneurs by same deadline.
                                                </li>
                                                <li>
                                                    Making special contribution in the implementation of the vision 2041 of the Government of the People's Republic of Bangladesh to include Bangladesh in the list of developed countries.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="container">
                            <div className="container-fluid text-center">
                                <div className="row" style={{ paddingBottom: '100px' }}>
                                    <div className="col-md-12">
                                        {/* <img
                                            style={{ marginTop: '-30px', width: '90%' }}
                                            src="https://old.nagadhat.com.bd/images/join-us.png"
                                            alt="Join Us at Nagadhat Bangladesh"
                                        /> */}
                                        <h5 className='text-center pb-3'>Nagadhat Bangladesh</h5>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <div>
                                                <Link
                                                    href="/merchant"
                                                    className="add-to-cart-link"
                                                >
                                                    Become a Merchant
                                                </Link>
                                            </div>
                                            <div>
                                                <Link
                                                    href="/affiliate"
                                                    className="add-to-cart-link"
                                                >
                                                    Become an Affiliate
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
