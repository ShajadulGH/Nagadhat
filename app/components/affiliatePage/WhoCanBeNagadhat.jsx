import { FaUserCheck } from "react-icons/fa";

const WhoCanBeNagadhat = () => {
    return (
        <>
            <div className="row justify-content-center pb-5">
                <div className="col-lg-8 col-md-12 col-sm-12 text-center">
                    <h2 className="fs-1 mb-3">
                        Who can be Nagadhat affiliates?
                    </h2>
                    <p className="fs-5">
                        People who pass their idle time over the internet can be
                        our affiliated marketing member. Housewives, Students
                        these are the most potential affiliates.
                    </p>
                </div>
            </div>
            <div className="row justify-content-center pb-4">
                <div className="col-md-5">
                    <ul>
                        <li className="d-flex gap-3 pb-2 align-items-center">
                            <div className="">
                                <FaUserCheck
                                    className="fs-4"
                                    style={{ color: "#44bc9d" }}
                                />
                            </div>
                            <div className="">
                                <h6 className="mb-0 fs-6">Housewives</h6>
                                <p>
                                    Housewives after their daily chores can use
                                    their time to be affiliators.
                                </p>
                            </div>
                        </li>
                        <li className="d-flex gap-3 pb-2 align-items-center">
                            <div className="">
                                <FaUserCheck
                                    className="fs-4"
                                    style={{ color: "#44bc9d" }}
                                />
                            </div>
                            <div className="">
                                <h6 className="mb-0 fs-6">Students</h6>
                                <p>
                                    Students besides their study can earn from
                                    nagadhat affiliates program
                                </p>
                            </div>
                        </li>
                        <li className="d-flex gap-3 pb-2 align-items-center">
                            <div className="">
                                <FaUserCheck
                                    className="fs-4"
                                    style={{ color: "#44bc9d" }}
                                />
                            </div>
                            <div className="">
                                <h6 className="mb-0 fs-6">
                                    Small Business Owner
                                </h6>
                                <p>
                                    They earn money in their leisure time can be
                                    Nagadhat affiliates
                                </p>
                            </div>
                        </li>
                        <li className="d-flex gap-3 pb-2 align-items-center">
                            <div className="">
                                <FaUserCheck
                                    className="fs-4"
                                    style={{ color: "#44bc9d" }}
                                />
                            </div>
                            <div className="">
                                <h6 className="mb-0 fs-6">Everyone</h6>
                                <p>
                                    Overall there is no limitation, anyone can
                                    be nagadhat affiliates
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default WhoCanBeNagadhat;
