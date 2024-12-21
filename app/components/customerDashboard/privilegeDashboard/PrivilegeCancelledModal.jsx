"use client";
import { postPrivilegeCardCancelAggriment } from "@/app/services/privilegeCard/postPrivilegeCardCancelAggriment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const PrivilegeCancelledModal = ({
    setCancelToggleStatus,
    cancelToggleStatus,
}) => {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const closeCancelModal = useRef(null);

    const handleCancelAggriment = async () => {
        const cancelStatus = { status: 2 };

        try {
            startTransition(async () => {
                const response = await postPrivilegeCardCancelAggriment(
                    session?.accessToken,
                    cancelStatus
                );

                if (response?.code === 200) {
                    setCancelToggleStatus(!cancelToggleStatus);
                    toast.success(response?.message);
                    closeModal();
                } else {
                    toast.error(response?.message);
                }
            });
        } catch (error) {
            console.error("Error cancelling agreement:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const closeModal = () => {
        if (closeCancelModal?.current) {
            document.activeElement?.blur();
            const modalInstance = bootstrap.Modal.getInstance(
                closeCancelModal.current
            );
            modalInstance?.hide();
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="privilege-cancelled-modal"
                tabIndex="-1"
                aria-labelledby="privilege-cancelled-modalLabel"
                aria-hidden="true"
                ref={closeCancelModal}
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
                            <div className="resal-top-areass p-0 p-md-4">
                                <div className=" text-center px-2 px-md-4 py-2 mb-1 mb-md-4 ">
                                    <h1 className="mb-4 bg-success d-inline-block text-white px-4 py-2 fs-5 font-width-medium rounded-4 ">
                                        প্রিভিলেজ কার্ড রিফান্ডের শর্তাবলী
                                    </h1>
                                </div>
                                <div className="pb-4">
                                    <p className="fs-6 lh-lg">
                                        <strong className="bg-success px-3 text-white py-2 rounded-2 me-2 d-block d-md-inline-block">
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
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
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

                                <div className="pb-4">
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ২. রিফান্ড প্রক্রিয়া:
                                        </strong>
                                        <p className="pt-2 ps-3 pb-2">
                                            <span>
                                                কার্ড বাতিলের অনুরোধ আপনার
                                                অ্যাকাউন্ট থেকে প্রাপ্তির ১৫
                                                কার্যদিবসের মধ্যে, নির্ধারিত
                                                সার্ভিস চার্জ কর্তন করে অবশিষ্ট
                                                অর্থ আপনার প্রদত্ত ব্যাংক
                                                অ্যাকাউন্টে ফেরত প্রদান করা হবে।
                                            </span>
                                        </p>
                                    </div>
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            ৩. সুবিধা স্থগিতকরণ:
                                        </strong>
                                        <p className="pt-2 ps-3 pb-2">
                                            <span>
                                                কার্ড বাতিলের অনুরোধ প্রাপ্তির
                                                সঙ্গে সঙ্গে কার্ডের মাধ্যমে
                                                প্রদত্ত সকল সুবিধা স্থগিত হয়ে
                                                যাবে।
                                            </span>
                                        </p>
                                    </div>
                                    <div className="fs-6 lh-lg ">
                                        <strong className="bg-success px-3 text-white py-1 d-inline-block rounded-2 me-2">
                                            অতিরিক্ত তথ্য:
                                        </strong>
                                        <p className="pt-2 ps-3 pb-2">
                                            <span>
                                                নগদহাট কর্তৃপক্ষ কার্ডের রিফান্ড
                                                পলিসি যেকোনো সময় পরিবর্তন করার
                                                অধিকার সংরক্ষণ করে।
                                            </span>
                                        </p>
                                        <p className="pb-2">
                                            নগদহাট প্রিভিলেজ কার্ড ব্যবহারের
                                            জন্য ধন্যবাদ। আমাদের লক্ষ্য আপনাকে
                                            সর্বোত্তম সেবা প্রদান করা।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center ">
                            <button
                                disabled={isPending}
                                onClick={handleCancelAggriment}
                                type="button"
                                className={` ${
                                    isPending ? "disabled-button" : ""
                                } add-to-cart-link border-0 rounded-3 text-capitalize px-4`}
                            >
                                {isPending ? (
                                    <div
                                        style={{
                                            height: "21px",
                                            width: "90px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <RotatingLines
                                            visible={true}
                                            height="18"
                                            width="20"
                                            color="#ffffff"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="w-25"
                                        />
                                    </div>
                                ) : (
                                    <span>Let's start shopping</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCancelledModal;
