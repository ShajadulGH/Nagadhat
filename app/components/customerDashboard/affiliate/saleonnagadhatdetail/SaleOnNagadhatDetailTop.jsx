const SaleOnNagadhatDetailTop = ({ saleOnNagadhatData }) => {
    return (
        <>
            <div className="resal-top-areass p-4">
                <div className=" text-center px-5 py-2 mb-4 ">
                    <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-4 font-width-medium rounded-4 ">
                        রিসেল/পুনঃবিক্রয় চুক্তি
                    </h1>
                    <p className="fs-6">
                        এই চুক্তিটি অদ্য
                        <strong>
                            {" "}
                            {saleOnNagadhatData?.agreement_date || "N/A"}{" "}
                        </strong>
                        ইং তারিখে নিম্নের দুই পক্ষের মধ্যে ঢাকায় সম্পাদিত হচ্ছে।
                    </p>
                </div>
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            প্রথম পক্ষঃ
                        </strong>
                        <strong>
                            নাম: {saleOnNagadhatData?.first_name || "N/A"}
                        </strong>{" "}
                        মোবাইল নং-
                        <strong> {saleOnNagadhatData?.phone || "N/A"} </strong>
                        ,জাতিয় পরিচয় পত্র নম্বর:
                        <strong>
                            {" "}
                            {saleOnNagadhatData?.nid_no || "N/A"}{" "}
                        </strong>{" "}
                        ,ঠিকানা:
                        <strong> {saleOnNagadhatData?.address || "N/A"}</strong>
                    </p>
                </div>
                <div className=" pb-4">
                    <p className=" fs-6 lh-lg ">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            দ্বিতীয় পক্ষঃ
                        </strong>
                        <strong> নগদহাট বাংলাদেশ লিমিটেড,</strong>
                        (পরবর্তীতে শুধু নগদহাট হিসাবে উল্লেখ করা হবে যেটি
                        কোম্পানি এ্যাক্ট ১৯৯৪ এর অধীনে গঠিত একটি প্রাইভেট
                        লিমিটেড কোম্পানি) এর পক্ষে প্রতিষ্ঠানের ব্যবস্থাপনা
                        পরিচালক জনাব মোঃ ইস্রাফিল মোল্লা (এক্ষেত্রে কোম্পানির
                        সকল শেয়ার হোল্ডার, পরিচালকবৃন্দ ও এই চুক্তির আওতায়
                        আসবে) ঠিকানাঃ খাজা সুপার মার্কেট (৩য় তলা), ৭ দক্ষিন
                        কল্যাণপুর, মিরপুর রোড, ঢাকা-১২০৭।
                    </p>
                </div>
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            চুক্তির উদ্দেশ্যঃ
                        </strong>{" "}
                        নগদহাট একটি ই-কমার্স মার্কেটপ্লেস। নগদহাট বাংলাদেশ
                        লিমিটেড তার ই-কমার্স মার্কেটলেসে বিভিন্ন ভেন্ডরের পণ্য
                        B2B এর আওতায় ক্রয়-বিক্রয় করে থাকেন। প্রথম পক্ষ,
                        দ্বিতীয় পক্ষ এর B2B পলিসিতে আগ্রহী হয়ে ২য় পক্ষের
                        ই-কমার্স মার্কেটপ্লেসে অবস্থিত গ্লোবাল ডিস্ট্রিবিউশন
                        নামক ভেন্ডর থেকে নিম্নোক্ত ইনভয়েজের মাধ্যমে কিছু পণ্য
                        ক্রয় করেন ৷ এরপর প্রথমপক্ষ তার ক্রয়কৃত পণ্য সমূহ
                        নগদহাট ডিজিটাল মার্কেটপ্লেসে রিসেল/পুনঃবিক্রয় করার আগ্রহ
                        প্রকাশ করলে এই চুক্তির অবতারণা হয়।
                    </p>
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailTop;
