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
                                        রিসেল/পুনঃবিক্রয় চুক্তি
                                    </h1>
                                    <p className="fs-6">
                                        এই চুক্তিটি অদ্য
                                        <strong> 11/10/2024</strong>
                                        ইং তারিখে নিম্নের দুই পক্ষের মধ্যে ঢাকায়
                                        সম্পাদিত হচ্ছে।
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            প্রথম পক্ষঃ
                                        </strong>
                                        <strong>নাম: Armanul Korim</strong>{" "}
                                        মোবাইল নং-
                                        <strong> 017239585213</strong>
                                        ,জাতিয় পরিচয় পত্র নম্বর:
                                        <strong>145823546</strong> ,ঠিকানা:
                                        <strong>Mirpur,Dhaka</strong>
                                    </p>
                                </div>
                                <div className=" pb-4">
                                    <p className=" fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            দ্বিতীয় পক্ষঃ
                                        </strong>
                                        <strong>
                                            {" "}
                                            নগদহাট বাংলাদেশ লিমিটেড,
                                        </strong>
                                        (পরবর্তীতে শুধু নগদহাট হিসাবে উল্লেখ করা
                                        হবে যেটি কোম্পানি এ্যাক্ট ১৯৯৪ এর অধীনে
                                        গঠিত একটি প্রাইভেট লিমিটেড কোম্পানি) এর
                                        পক্ষে প্রতিষ্ঠানের ব্যবস্থাপনা পরিচালক
                                        জনাব মোঃ ইস্রাফিল মোল্লা (এক্ষেত্রে
                                        কোম্পানির সকল শেয়ার হোল্ডার,
                                        পরিচালকবৃন্দ ও এই চুক্তির আওতায় আসবে)
                                        ঠিকানাঃ খাজা সুপার মার্কেট (৩য় তলা), ৭
                                        দক্ষিন কল্যাণপুর, মিরপুর রোড, ঢাকা-১২০৭।
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            চুক্তির উদ্দেশ্যঃ
                                        </strong>{" "}
                                        নগদহাট একটি ই-কমার্স মার্কেটপ্লেস।
                                        নগদহাট বাংলাদেশ লিমিটেড তার ই-কমার্স
                                        মার্কেটলেসে বিভিন্ন ভেন্ডরের পণ্য B2B এর
                                        আওতায় ক্রয়-বিক্রয় করে থাকেন। প্রথম
                                        পক্ষ, দ্বিতীয় পক্ষ এর B2B পলিসিতে
                                        আগ্রহী হয়ে ২য় পক্ষের ই-কমার্স
                                        মার্কেটপ্লেসে অবস্থিত গ্লোবাল
                                        ডিস্ট্রিবিউশন নামক ভেন্ডর থেকে নিম্নোক্ত
                                        ইনভয়েজের মাধ্যমে কিছু পণ্য ক্রয় করেন ৷
                                        এরপর প্রথমপক্ষ তার ক্রয়কৃত পণ্য সমূহ
                                        নগদহাট ডিজিটাল মার্কেটপ্লেসে
                                        রিসেল/পুনঃবিক্রয় করার আগ্রহ প্রকাশ করলে
                                        এই চুক্তির অবতারণা হয়।
                                    </p>
                                </div>
                            </div>
                            {/*  */}

                            <div className="resale-invoice-areass text-center p-4 pt-0">
                                <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-4 font-width-medium rounded-4 ">
                                    Invoice Details
                                </h1>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col fs-6">SL</th>
                                                <th scope="col fs-6">
                                                    Invoice Number & Date
                                                </th>
                                                <th scope="col fs-6">
                                                    MRP Price (BDT)
                                                </th>
                                                <th scope="col fs-6">
                                                    Discount (BDT)
                                                </th>
                                                <th
                                                    scope="col fs-6"
                                                    className=" text-end"
                                                >
                                                    Trade Price (BDT)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>res1258 || 11/10/2024</td>
                                                <td>580236</td>
                                                <td>5000</td>
                                                <td className=" text-end">
                                                    580236
                                                </td>
                                            </tr>

                                            <tr>
                                                <td
                                                    colSpan={`4`}
                                                    className=" text-end"
                                                >
                                                    <strong>
                                                        Total Paid Amount
                                                    </strong>
                                                </td>
                                                <td className=" text-end">
                                                    <strong>580236</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/*  */}

                            <div className="saleon-nagadhat-detail-pay text-center p-4 pt-0">
                                <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-6 font-width-medium rounded-4 ">
                                    নগদহাট ডিজিটাল মার্কেট প্লেসে
                                    বিক্রিতব্য/বিক্রয়কৃত পণ্যের টাকা প্রদানের
                                    সম্ভাব্য তারিখ ও টাকার বিবরণ
                                </h1>
                                <div className="table-responsive">
                                    <table className="table table-striped border-secondary table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col fs-6">SL</th>
                                                <th scope="col fs-6">Date</th>
                                                <th scope="col fs-6">
                                                    Depositing Amount in the
                                                    Personal Wallet
                                                </th>
                                                <th scope="col fs-6">
                                                    Payable Amount (After
                                                    deducting 10% Service
                                                    Charge)
                                                </th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"> 1</th>
                                                <td>11/10/2024</td>
                                                <td>520236</td>
                                                <td>2023</td>
                                                <td> Bank</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/*  */}
                            <div className="resale-bottom-areass px-4">
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            সাধারণ শর্তাবলিঃ {""}
                                        </strong>
                                        ১. এই চুক্তির আওতায় প্রথম পক্ষ তার
                                        ক্রয়কৃত পণ্যসমূহ বিক্রয় করার জন্য
                                        দ্বিতীয় পক্ষের নিকট পাঠাবে। দ্বিতীয়
                                        পক্ষ উপরোল্লিখত ইনভয়েজটির মাধ্যমে
                                        ক্রয়কৃত <strong>5125689</strong> টাকার
                                        পণ্যসমূহ রিসেল/পুনঃবিক্রয় করে
                                        বিক্রয়কৃত অর্থ উপরোল্লিখিত শিডিউল মোট{" "}
                                        <strong>34</strong>
                                        মাসে পরিশোধ করবেন।
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            বিশেষ শর্তাবলিঃ {""}
                                        </strong>
                                        উভয় পক্ষ ০২ মাসের লিখিত পত্রের মাধ্যমে
                                        চুক্তিটি বাতিল করতে পারবেন।
                                        মেয়াদপূর্তির আগে কোন পক্ষ যদি চুক্তি
                                        বাতিল করতে চায়, এক্ষেত্রে ১ম পক্ষের
                                        ইনভয়েজে পরিশোধিত টাকা থেকে ২২% সার্ভিস
                                        চার্জ কর্তন পূর্বক ২য় পক্ষ ইতোপূর্বে যে
                                        পরিমান অর্থ পরিশোধ করেছেন, তা কর্তন করে
                                        বাকী পণ্য অথবা সমমূল্য টাকা ফেরত দিয়ে
                                        চুক্তি বাতিল করা হবে ।
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            চুক্তির মেয়াদঃ {""}
                                        </strong>
                                        চুক্তির মেয়াদ হবে স্বাক্ষরিত তারিখ হতে{" "}
                                        <strong>34</strong> মাস।
                                    </p>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                                            নমিনি সংক্রান্ত তথ্যাবলিঃ{""}
                                        </strong>
                                        আমি এই চুক্তির মাধ্যমে অর্জিত বা প্রাপ্য
                                        অর্থ আমার মৃত্যুর পর নিম্নে বর্ণিত
                                        ব্যক্তিকে প্রদানের জন্য মনোনীত করলাম।
                                        আমি উল্লেখিত মনোনয়ন যে কোন সময় বাতিল বা
                                        পরিবর্তনের অধিকার সংরক্ষন করি।
                                    </p>
                                    <div className="w-50 py-4 ">
                                        <div className="d-flex pb-1">
                                            <div className="col fs-6">
                                                নমিনির নাম{" "}
                                            </div>
                                            <div className="col fs-6">
                                                <strong>Md.Safone</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-1">
                                            <div className="col fs-6">
                                                জাতিয় পরিচয় পত্র নম্বর
                                            </div>
                                            <div className="col fs-6">
                                                <strong>12586997</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-1">
                                            <div className="col fs-6">
                                                মোবাইল নম্বর
                                            </div>
                                            <div className="col fs-6">
                                                <strong>01685202369</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-1">
                                            <div className="col fs-6">
                                                হিসাবধারীর সাথে সম্পর্ক
                                            </div>
                                            <div className="col fs-6">
                                                <strong>Father</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="fs-6 fw-semibold ">
                                        উপরোক্ত সকল শর্ত বুঝে, সুস্থ মস্তিষ্কে ও
                                        বিনা প্ররোচনায়, স্বাক্ষীগণের উপস্থিতিতে
                                        আমি আমার ডিজিটাল স্বাক্ষর প্রদান করিলাম।
                                    </h5>
                                </div>
                            </div>
                            {/*  */}
                            <div className="saleon-nagadhat-detail-bottom d-flex gap-4 justify-content-between px-4 pt-0 pb-5">
                                <div className="">
                                    <h4 className=" fs-4">প্রথম পক্ষ</h4>
                                    <div className="pt-2 pb-4">
                                        {/* <QRCode
                                            size={256}
                                            style={{
                                                height: "auto",
                                                maxWidth: "100px",
                                                width: "100%",
                                            }}
                                            value={`Name: ${Faisal} , Phone: ${saleOnNagadhatData?.phone} , Address: ${saleOnNagadhatData?.address} , NID: ${saleOnNagadhatData?.nid_no},  Agreement Date: ${saleOnNagadhatData?.agreement_date_qr},  IP: ${saleOnNagadhatData?.ip_address}, Device: ${saleOnNagadhatData?.device}, Browser: ${saleOnNagadhatData?.browser}, Ip Address: ${saleOnNagadhatData?.browsing_address}`}
                                        /> */}
                                    </div>
                                    <p>
                                        <strong className="fs-5">
                                            Armanul Korim
                                        </strong>
                                    </p>
                                </div>
                                <div className="">
                                    <div className="pb-2">
                                        <Image
                                            src={`/images/signature.png`}
                                            width={120}
                                            height={50}
                                            alt="image"
                                            sizes="100vw"
                                        />
                                    </div>
                                    <p className=" fs-6">
                                        দ্বিতীয় পক্ষ <br /> মোঃ ইস্রাফিল মোল্লা
                                        <br />
                                        ব্যবস্থাপনা পরিচালক,
                                        <br /> নগদহাট বাংলাদেশ লিমিটেড।
                                    </p>
                                </div>
                            </div>
                            <div className="sale-on-agreement-print d-flex align-items-center justify-content-center gap-3 pb-4">
                                <button
                                    // onClick={() => window.print()}
                                    className="btn btn-dark"
                                    download
                                >
                                    Download
                                </button>
                                <button
                                    className="btn btn-success"
                                    // onClick={() => window.print()}
                                >
                                    Print
                                </button>
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
