import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";
const SaleOnNagadhatDetailBottom = ({ saleOnNagadhatData, headalePrint }) => {
    return (
        <>
            <div className="saleon-nagadhat-detail-bottom d-flex gap-4 justify-content-between px-4 pt-0 pb-5">
                <div className="">
                    <h4 className="mb-4 fs-4">প্রথম পক্ষ</h4>
                    <p>
                        <strong className="fs-5">
                            {saleOnNagadhatData?.first_name || "N/A"}
                        </strong>
                    </p>
                    <div className="pt-2 pb-4">
                        <QRCode
                            size={256}
                            style={{
                                height: "auto",
                                maxWidth: "100px",
                                width: "100%",
                            }}
                            value={`Name: ${saleOnNagadhatData?.first_name} ,\nPhone: ${saleOnNagadhatData?.phone} ,\nAddress: ${saleOnNagadhatData?.address} ,\nNID: ${saleOnNagadhatData?.nid_no},\nAgreement Date: ${saleOnNagadhatData?.agreement_date_qr},\nIP: ${saleOnNagadhatData?.ip_address},\nDevice: ${saleOnNagadhatData?.device},\nBrowser: ${saleOnNagadhatData?.browser},\nIp Address: ${saleOnNagadhatData?.browsing_address}`}
                        />
                    </div>
                    
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
                    onClick={headalePrint}
                    className="btn btn-dark"
                    download
                >
                    Download
                </button>
                <button
                    className="btn btn-success"
                    onClick={headalePrint}
                >
                    Print
                </button>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailBottom;
