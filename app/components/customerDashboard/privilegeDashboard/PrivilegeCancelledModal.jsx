import Image from "next/image";

const PrivilegeCancelledModal = () => {
    return (
        <>
            <div
                className="modal fade"
                id="privilege-cancelled-modal"
                tabIndex="-1"
                aria-labelledby="privilege-cancelled-modalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 text-black"
                                id="privilege-cancelled-modalLabel"
                            >
                                Cancel Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="customer-dashboard-order-history-title saleon-nagadhat-detail-header p-0">
                                <div
                                    className=" position-relative w-100 me-4"
                                    style={{ height: "100px" }}
                                >
                                    <Image
                                        src={`/images/Pad-1.png`}
                                        fill
                                        sizes="100vw"
                                        alt="image"
                                    />
                                </div>
                            </div>
                            {/*  */}
                            <div className="resal-top-areass p-4">
                                <div className=" text-center px-5 py-2 mb-4 ">
                                    <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-4 font-width-medium rounded-4 ">
                                        প্রিভিলেজ কার্ড রিফান্ডের শর্তাবলী
                                    </h1>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            কার্ড বাতিল এবং মূল্য ফেরতের
                                            শর্তাবলী:
                                        </strong>
                                        নগদহাট প্রিভিলেজ কার্ডের মূল্য ফেরত
                                        প্রক্রিয়া ও শর্তাবলী নিম্নে উল্লেখ করা
                                        হলো
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            ১. রিফান্ডের সময় ও সার্ভিস চার্জ:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            <strong className="d-block">
                                                <span>
                                                    ১ বছরের মধ্যে রিফান্ড:
                                                </span>
                                            </strong>
                                            <small className="ps-5">
                                                কার্ড ক্রয়ের তারিখ থেকে এক বছরের
                                                মধ্যে রিফান্ড করতে চাইলে, ১৫%
                                                সার্ভিস চার্জ প্রযোজ্য।
                                            </small>
                                        </p>
                                        <p className="pt-2 ps-3">
                                            <strong className="d-block">
                                                <span>
                                                    ১ থেকে ২ বছরের মধ্যে
                                                    রিফান্ড:
                                                </span>
                                            </strong>
                                            <small className="ps-5">
                                                এক বছর থেকে দুই বছরের মধ্যে
                                                রিফান্ড করতে চাইলে, ১০% সার্ভিস
                                                চার্জ প্রযোজ্য।
                                            </small>
                                        </p>
                                        <p className="pt-2 ps-3">
                                            <strong className="d-block">
                                                <span>
                                                    ২ থেকে ৩ বছরের মধ্যে
                                                    রিফান্ড:
                                                </span>
                                            </strong>
                                            <small className="ps-5">
                                                দুই বছর থেকে তিন বছরের মধ্যে
                                                রিফান্ড করতে চাইলে, ৫% সার্ভিস
                                                চার্জ প্রযোজ্য।
                                            </small>
                                        </p>
                                        <p className="pt-2 ps-3">
                                            <strong className="d-block">
                                                <span>
                                                    ৩ থেকে ৪ বছরের মধ্যে
                                                    রিফান্ড:
                                                </span>
                                            </strong>
                                            <small className="ps-5">
                                                তিন বছর থেকে চার বছরের মধ্যে
                                                রিফান্ড করতে চাইলে, কোনো সার্ভিস
                                                চার্জ প্রযোজ্য হবে না।
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center ">
                            <button
                                type="button"
                                className="add-to-cart-link border-0 rounded-3 text-capitalize px-4"
                            >
                                Let's start shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCancelledModal;
