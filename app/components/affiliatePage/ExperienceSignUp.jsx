const ExperienceSignUp = () => {
    return (
        <div className="row justify-content-center pb-5">
            <div className="col-lg-8 col-md-12 col-sm-12 text-center">
                <div
                    className="p-5 shadow-sm rounded-4 "
                    style={{ background: "#f6f8fc" }}
                >
                    <div className="pb-3">
                        <h4 className="fs-2 mb-1">
                            For test experience sign up here
                        </h4>
                        <p className="fs-6">
                            By signing up you can feel the affiliate test and
                            other member experience and learn about their work
                            process.
                        </p>
                    </div>
                    <div className="">
                        <form>
                            <div className="d-flex gap-2">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Your Email..."
                                />
                                <button
                                    className="add-to-cart-link rounded-2 border-0 "
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceSignUp;
