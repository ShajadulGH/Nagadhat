const SaleOnNagadhatDetailNomini = ({ saleOnNagadhatData }) => {
    return (
        <>
            <div className="resale-bottom-areass px-4">
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            সাধারণ শর্তাবলিঃ {""}
                        </strong>
                        ১. এই চুক্তির আওতায় প্রথম পক্ষ তার ক্রয়কৃত পণ্যসমূহ
                        বিক্রয় করার জন্য দ্বিতীয় পক্ষের নিকট পাঠাবে। দ্বিতীয়
                        পক্ষ উপরোল্লিখত ইনভয়েজটির মাধ্যমে ক্রয়কৃত{" "}
                        <strong>
                            {" "}
                            {saleOnNagadhatData?.total_tp || "N/A"}{" "}
                        </strong>{" "}
                        টাকার পণ্যসমূহ রিসেল/পুনঃবিক্রয় করে বিক্রয়কৃত অর্থ
                        উপরোল্লিখিত শিডিউল মোট{" "}
                        <strong>
                            {" "}
                            {saleOnNagadhatData?.duration || "N/A"}{" "}
                        </strong>
                        মাসে পরিশোধ করবেন।
                    </p>
                </div>
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            বিশেষ শর্তাবলিঃ {""}
                        </strong>
                        উভয় পক্ষ ০২ মাসের লিখিত পত্রের মাধ্যমে চুক্তিটি বাতিল
                        করতে পারবেন। মেয়াদপূর্তির আগে কোন পক্ষ যদি চুক্তি বাতিল
                        করতে চায়, এক্ষেত্রে ১ম পক্ষের ইনভয়েজে পরিশোধিত টাকা
                        থেকে ২২% সার্ভিস চার্জ কর্তন পূর্বক ২য় পক্ষ ইতোপূর্বে
                        যে পরিমান অর্থ পরিশোধ করেছেন, তা কর্তন করে বাকী পণ্য
                        অথবা সমমূল্য টাকা ফেরত দিয়ে চুক্তি বাতিল করা হবে ।
                    </p>
                </div>
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            চুক্তির মেয়াদঃ {""}
                        </strong>
                        চুক্তির মেয়াদ হবে স্বাক্ষরিত তারিখ হতে{" "}
                        <strong>
                            {" "}
                            {saleOnNagadhatData?.duration || "N/A"}{" "}
                        </strong>{" "}
                        মাস।
                    </p>
                </div>
                <div className="pb-4">
                    <p className="fs-6 lh-lg">
                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2">
                            নমিনি সংক্রান্ত তথ্যাবলিঃ{""}
                        </strong>
                        আমি এই চুক্তির মাধ্যমে অর্জিত বা প্রাপ্য অর্থ আমার
                        মৃত্যুর পর নিম্নে বর্ণিত ব্যক্তিকে প্রদানের জন্য মনোনীত
                        করলাম। আমি উল্লেখিত মনোনয়ন যে কোন সময় বাতিল বা
                        পরিবর্তনের অধিকার সংরক্ষন করি।
                    </p>
                    <div className="w-50 py-4 ">
                        <div className="d-flex pb-1">
                            <div className="col fs-6">নমিনির নাম </div>
                            <div className="col fs-6">
                                <strong>
                                    {saleOnNagadhatData?.nominee_name || "N/A"}
                                </strong>
                            </div>
                        </div>
                        <div className="d-flex pb-1">
                            <div className="col fs-6">
                                জাতিয় পরিচয় পত্র নম্বর
                            </div>
                            <div className="col fs-6">
                                <strong>
                                    {saleOnNagadhatData?.nominee_nid || "N/A"}
                                </strong>
                            </div>
                        </div>
                        <div className="d-flex pb-1">
                            <div className="col fs-6">মোবাইল নম্বর</div>
                            <div className="col fs-6">
                                <strong>
                                    {saleOnNagadhatData?.nominee_phone || "N/A"}
                                </strong>
                            </div>
                        </div>
                        <div className="d-flex pb-1">
                            <div className="col fs-6">
                                হিসাবধারীর সাথে সম্পর্ক
                            </div>
                            <div className="col fs-6">
                                <strong>
                                    {saleOnNagadhatData?.nominee_relation ||
                                        "N/A"}
                                </strong>
                            </div>
                        </div>
                    </div>
                    <h5 className="fs-6 fw-semibold ">
                        উপরোক্ত সকল শর্ত বুঝে, সুস্থ মস্তিষ্কে ও বিনা
                        প্ররোচনায়, স্বাক্ষীগণের উপস্থিতিতে আমি আমার ডিজিটাল
                        স্বাক্ষর প্রদান করিলাম।
                    </h5>
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailNomini;
