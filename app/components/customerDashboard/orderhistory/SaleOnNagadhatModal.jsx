"use client";
import Image from "next/image";
import SaleOnNagadhatInvoice from "./SaleOnNagadhatInvoice";
import SaleOnNagadhatWallet from "./SaleOnNagadhatWallet";
import SaleOnNagadhatHeader from "./SaleOnNagadhatHeader";
import SaleOnNagadhatTop from "./SaleOnNagadhatTop";
import SaleOnNagadhatBottom from "./SaleOnNagadhatBottom";
import DeviceDetector from "device-detector-js";
import { useEffect, useRef, useState, useTransition } from "react";
import { getLocalIpAddress } from "@/app/services/affiliate/getLocalIpAddress";
import { useSession } from "next-auth/react";
import { getSaleOnNagadhat } from "@/app/services/affiliate/getSaleOnNagadhat";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";
import { postSaleOnNagadhat } from "@/app/services/affiliate/postSaleOnNagadhat";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const SaleOnNagadhatModal = ({ resaleOrderID }) => {
    const [isPending, startTransition] = useTransition();
    const [checkTermsCondition, setCheckTermsCondition] = useState(false);
    const [saleOnNagadhatData, setSaleOnNagadhatData] = useState({});
    const [ipAddress, setIpAddress] = useState(null);
    const [deviceName, setDeviceName] = useState(null);
    const [browserInfo, setBrowserInfo] = useState(null);
    const [ipNumber, setIpNumber] = useState(null);
    const modalRef = useRef(null);

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchSaleOnNagadhatData = async () => {
                try {
                    const response = await getSaleOnNagadhat(
                        resaleOrderID,
                        session?.accessToken
                    );
                    startTransition(() => {
                        setSaleOnNagadhatData(response?.results || {});
                    });
                } catch (error) {}
            };
            fetchSaleOnNagadhatData();
        }
    }, [status, session?.accessToken, resaleOrderID]);

    const saleOnLength =
        saleOnNagadhatData && Object.keys(saleOnNagadhatData).length > 0;

    // Function to get IP address
    const fetchIpAddress = async () => {
        try {
            const response = await getLocalIpAddress();
            const ipNumber = response?.ip;

            if (!ipNumber) {
                console.error("IP number not found");
                return;
            }
            const fullAddressResponse = await fetch(
                `http://ip-api.com/json/${ipNumber}`
            );
            const fullAddress = await fullAddressResponse.json();
            setIpNumber(ipNumber);
            setIpAddress(fullAddress?.city);
        } catch (error) {
            console.error("Error fetching IP address:", error);
        }
    };

    // Function to get device information
    const getDeviceInfo = () => {
        const deviceDetector = new DeviceDetector();
        const userAgent = navigator.userAgent;
        const deviceInfo = deviceDetector.parse(userAgent);
        setDeviceName(`${deviceInfo?.device?.type || "N/A"}`);
        setBrowserInfo(`${deviceInfo?.client?.name || "N/A"}`);
    };

    const handleTermsCondition = () => {
        setCheckTermsCondition(!checkTermsCondition);
    };

    useEffect(() => {
        if (checkTermsCondition) {
            fetchIpAddress();
            getDeviceInfo();
        }
    }, [checkTermsCondition]);

    // Function for handleAgreement
    const handleAgreement = async () => {
        try {
            if (!saleOnNagadhatData || !resaleOrderID) {
                toast.error("Missing necessary order or product data.");
                return;
            }
            const saleOnData = {
                order_id: resaleOrderID,
                product_id: saleOnNagadhatData?.product_id,
                total_tp: saleOnNagadhatData?.total_tp,
                total_mrp: saleOnNagadhatData?.total_mrp,
                duration: saleOnNagadhatData?.duration,
                ip_address: ipNumber || "",
                device: deviceName || "",
                browser: browserInfo || "",
                browsing_address: ipAddress || "",
            };
            const response = await postSaleOnNagadhat(
                saleOnData,
                session?.accessToken
            );
            if (!response?.error) {
                const modal = bootstrap.Modal.getInstance(modalRef.current);
                if (modal) modal.hide();
                router.push(`/thankyou?orderId=${resaleOrderID}`);
            } else {
                toast.error(
                    response?.message || "Failed to process the sale agreement."
                );
            }
        } catch (error) {
            console.error("Error handling agreement:", error);
            toast.error(
                "An unexpected error occurred while processing the agreement."
            );
        }
    };

    return (
        <>
            <ToastContainer />
            <div
                ref={modalRef}
                className="modal fade"
                id="sale-on-nagadhat-modal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        {isPending && <LodingFixed />}
                        <SaleOnNagadhatHeader />
                        <div className="modal-body px-5">
                            {saleOnLength ? (
                                <>
                                    <SaleOnNagadhatTop
                                        saleOnNagadhatData={saleOnNagadhatData}
                                    />
                                    <SaleOnNagadhatInvoice
                                        saleOnNagadhatData={saleOnNagadhatData}
                                    />
                                    <SaleOnNagadhatWallet
                                        saleOnNagadhatData={saleOnNagadhatData}
                                    />
                                    <SaleOnNagadhatBottom
                                        saleOnNagadhatData={saleOnNagadhatData}
                                    />
                                </>
                            ) : (
                                <NoDataFound />
                            )}

                            <div className=" d-flex gap-4 justify-content-between">
                                <div className="">
                                    <div className="mb-3 d-flex align-items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input border-2 border-info"
                                            id="terms-condition"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                            }}
                                            checked={checkTermsCondition}
                                            onChange={handleTermsCondition}
                                        />
                                        <label
                                            className="form-check-label fs-5 fw-bold "
                                            htmlFor="terms-condition"
                                        >
                                            I accept the terms and conditions.
                                        </label>
                                    </div>
                                    <h4 className=" fs-4">প্রথম পক্ষ</h4>
                                    <p>
                                        <strong className="fs-5">
                                            {saleOnNagadhatData?.first_name ||
                                                "N/A"}
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
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    opacity: checkTermsCondition ? 1 : 0.2,
                                    cursor: checkTermsCondition
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                                disabled={!checkTermsCondition}
                                onClick={handleAgreement}
                            >
                                I agreed to a sale on Nagadhat.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatModal;
