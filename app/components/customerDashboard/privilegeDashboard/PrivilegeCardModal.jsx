import Image from "next/image";

const PrivilegeCardModal = () => {
    return (
        <>
            <div
                className="modal fade"
                id="exampl-Detailse-Modal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5">Card Details</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div> */}
                        <div className="modal-body pt-2 pt-sm-4 pb-0">
                            <div className="customer-dashboard-order-history-title saleon-nagadhat-detail-header p-0 d-flex align-items-center justify-content-between pb-3 gap-4">
                                <div className="">
                                    <Image
                                        src={`/images/Salle-on-Nagadhat-Logo-1.png`}
                                        sizes="100vw"
                                        alt="image 1"
                                        width={300}
                                        height={35}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="">
                                    <Image
                                        src={`/images/Salle-on-Nagadhat-Logo-2.png`}
                                        sizes="100vw"
                                        alt="image 2"
                                        width={300}
                                        height={25}
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                            {/*  */}
                            <div className="resal-top-areass p-0 p-md-4">
                                <div className="text-center px-2 px-md-4 pt-4 pt-md-0 mb-1 mb-md-3 ">
                                    <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-5 font-width-medium rounded-4 ">
                                        মেম্বারশিপ কার্ড সুবিধা ও শর্তাবলী
                                    </h1>
                                    <p className="fs-6">
                                        নগদহাট মেম্বারশিপ কার্ড আপনাকে দেশের
                                        বিভিন্ন প্রতিষ্ঠানে বিশেষ সুবিধা উপভোগের
                                        সুযোগ করে দেয়। <br></br> কার্ড ব্যবহার
                                        করে আপনি নিন্মোক্ত সুবিধাগুলো উপভোগ করতে
                                        পারবেন:
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg d-flex justify-content-center">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2 d-block d-md-inline-block">
                                            মেম্বারশিপ কার্ডের প্রধান
                                            সুবিধাসমূহ:
                                        </strong>
                                    </p>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ১. নির্ধারিত হোটেল ও রেস্টুরেন্টে
                                            বিশেষ ছাড়:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            দেশের বিভিন্ন জনপ্রিয় হোটেল ও
                                            রেসটুরেন্টে খাবারের উপর আকর্ষণীয়
                                            ডিসকাউন্ট।
                                        </p>
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ২. ডায়াগনস্টিক সেন্টারে বিশেষ ছাড়:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            স্বাস্থ্যসেবার জন্য নির্ধারিত
                                            ডায়াগনস্টিক সেন্টারগুলোতে মেডিকেল
                                            টেস্ট এবং কনসালটেশনে বিশেষ ছাড়।
                                        </p>
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ৩. ব্র্যান্ডেড পণ্যে ছাড:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            দেশের বিভিন্ন ব্র্যান্ডের পণ্যে
                                            বিশেষ ছাড় উপভোগ করার সুযোগ।
                                        </p>
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ৪. অন্যান্য প্রতিষ্ঠানে বিশেষ সুবিধা
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            কার্ডধারীরা নির্ধারিত প্রতিষ্ঠানে
                                            পণ্য ও সেবা ক্রয়ের ক্ষেত্রে বিশেষ
                                            ডিসকাউন্ট পেয়ে থাকেন।
                                        </p>
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            বিশেষ হাইলাইট:
                                        </strong>
                                        <p className="pt-2">
                                            আপনার মেম্বারশিপ কার্ড ক্রয়ের জন্য
                                            প্রদত্ত অর্থের সমপরিমাণ নির্ধারিত
                                            পণ্য বা সেবা আপনি পেয়ে যাবেন। ফলে
                                            মেম্বারশিপের জন্য আপনাকে এক্সট্রা
                                            কোনো টাকা খরচ করতে হবে না।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg d-flex justify-content-center">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2 d-block d-md-inline-block">
                                            মেম্বারশিপ কার্ড ব্যবহারের শর্তাবলী:
                                        </strong>
                                    </p>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ১. কার্ড ব্যবহারকারী:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            শুধুমাত্র কার্ডধারী বা কার্ডে
                                            উল্লেখিত ব্যক্তি এই সুবিধা উপভোগ
                                            করতে পারবেন।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ২. ডিসকাউন্ট প্রযোজ্যতা
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            কার্ডধারী সুবিধা পেতে চাইলে
                                            নির্ধারিত প্রতিষ্ঠানের শর্ত অনুযায়ী
                                            ডিসকাউন্ট পাবে।
                                        </p>
                                        <p className="pt-1 ps-3">
                                            ডিসকাউন্ট কেবলমাত্র নির্ধারিত পণ্য ও
                                            সেবার ক্ষেত্রে প্রযোজ্য।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ৩. কার্ডের মেয়াদ:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            কার্ড ক্রয়ের তারিখ থেকে নির্ধারিত
                                            মেয়াদ পর্যন্ত এই সুবিধা কার্যকর
                                            থাকবে।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg d-flex justify-content-center">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2 d-block d-md-inline-block">
                                            কার্ড অপেরত যোগ্যতার শর্তাবলী:
                                        </strong>
                                    </p>
                                </div>

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ১. কার্ডের অপব্যবহার:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            কার্ড অপব্যবহার বা অনৈতিক ব্যবহার
                                            শনাক্ত হলে, কার্ড বাতিল করা হবে।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ২. অপরিচিত ব্যবহারকারী:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            কার্ড শুধুমাত্র কার্ডধারীর জন্য
                                            প্রযোজ্য। অন্য কেউ এই কার্ড ব্যবহার
                                            করলে সেটি অবৈধ বিবেচিত হবে।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ৩. মেয়াদ উত্তীর্ণ কার্ড:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            মেম্বারশিপ কার্ডের নির্ধারিত মেয়াদ
                                            শেষ হলে কার্ড অকার্যকর হয়ে যাবে।
                                        </p>
                                    </div>
                                </div>
                                <div className="pb-3 pb-sm-0">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 rounded-2 me-2 d-inline-block">
                                            ৪. প্রতিষ্ঠানের বিধি লঙ্ঘন:
                                        </strong>
                                        <p className="pt-2 ps-3">
                                            নগদহাট কর্তৃপক্ষের নীতিমালা বা
                                            শর্তাবলী লঙ্ঘিত হলে কার্ড বাতিল করা
                                            হতে পারে।
                                        </p>
                                        <p className="pt-1">
                                            নগদহাট মেম্বারশিপ কার্ডের মাধ্যমে
                                            আমরা আপনার জীবনকে আরও সহজ এবং
                                            সাশ্রয়ী করতে প্রতিশ্রুতিবদ্ধ।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCardModal;
