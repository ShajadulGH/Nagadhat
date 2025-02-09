"use client";

import { getManageNomineeInfo } from "@/app/services/getManageNomineeInfo";
import { postManageNomineeInfo } from "@/app/services/postManageNomineeInfo";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const ManageNomineeInfo = () => {
    const [isPending, startTransition] = useTransition();
    const [nomineInfo, setNomineInfo] = useState({
        nominee_name: "",
        nominee_mobile_number: "",
        nominee_nid: "",
        nominee_relation: "",
    });
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            const fetchNomineeData = async () => {
                const nomineeData = await getManageNomineeInfo(
                    session?.accessToken
                );
                const nomineeResult = nomineeData?.results || {};
                setNomineInfo({
                    ...nomineInfo,
                    nominee_name: nomineeResult.nominee_name || "",
                    nominee_mobile_number:
                        nomineeResult.nominee_mobile_number || "",
                    nominee_nid: nomineeResult.nominee_nid || "",
                    nominee_relation: nomineeResult.nominee_relation || "",
                });
            };
            fetchNomineeData();
        }
    }, [session.accessToken]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNomineInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check for  fields
        if (
            !nomineInfo.nominee_name ||
            !nomineInfo.nominee_mobile_number ||
            !nomineInfo.nominee_nid ||
            !nomineInfo.nominee_relation
        ) {
            toast.error("Please fill out all  fields.");
            return;
        }
        if (nomineInfo.nominee_mobile_number.length !== 11) {
            toast.error("Nominee mobile number must be exactly 11 digits.");
            return;
        }

        try {
            startTransition(async () => {
                const response = await postManageNomineeInfo(
                    nomineInfo,
                    session?.accessToken
                );
                if (!response?.error) {
                    toast.success(response?.message);
                } else {
                    console.error("Update failed:", response);
                    toast.error(
                        response?.message || "Failed to update Nominee Info."
                    );
                }
            });
        } catch (error) {
            console.error("Error during update:", error);
            toast.error(
                error.message || "An error occurred. Please try again later."
            );
        }
    };

    const handleDataSync = async () => {
        try {
            startTransition(async () => {
                const nomineeData = await getManageNomineeInfo(
                    session?.accessToken,
                    session?.phone
                );
                if (nomineeData?.error) {
                    toast.error(nomineeData?.message);
                    return;
                }
                const nomineeResult = nomineeData?.results || {};
                setNomineInfo({
                    ...nomineInfo,
                    nominee_name: nomineeResult.nominee_name || "",
                    nominee_mobile_number: nomineeResult.nominee_mobile_number || "",
                    nominee_nid: nomineeResult.nominee_nid || "",
                    nominee_relation: nomineeResult.nominee_relation || "",
                });
                toast.success(nomineeData?.message || "Nominee info synced successfully");
            });
        } catch (error) {
            toast.error("Error fetching nominee info:", error);
            console.error("Error fetching nominee info:", error);
        }
    }
    return (
        <div className="accordion-item border-0 mb-4 rounded">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed rounded bg-white customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                >
                    Nominee Info
                </button>
            </h2>
            <div
                id="flush-collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
            >
                <div className="accordion-body border-top">
                    <div className="customer-manage-profile-from-area">
                        {(session?.phone && String(session?.phone).length > 11) && (
                            <div className="ms-auto">
                                <button className="add-to-cart-link border-0 ms-auto" onClick={handleDataSync}>
                                    sync
                                </button>
                            </div>
                        )}
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="nominee_name"
                                    className="form-label"
                                >
                                    Full Name
                                    {/* <span className="text-danger fw-bold">
                                        *
                                    </span> */}
                                </label>
                                <input
                                    type="text"
                                    name="nominee_name"
                                    className="form-control"
                                    id="nominee_name"
                                    value={nomineInfo.nominee_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="nominee_mobile_number"
                                    className="form-label"
                                >
                                    Mobile Number
                                    {/* <span className="text-danger fw-bold">
                                        *
                                    </span> */}
                                </label>
                                <input
                                    type="text"
                                    name="nominee_mobile_number"
                                    className="form-control"
                                    id="nominee_mobile_number"
                                    value={nomineInfo.nominee_mobile_number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="nominee_nid"
                                    className="form-label"
                                >
                                    NID No
                                </label>
                                <input
                                    type="number"
                                    name="nominee_nid"
                                    className="form-control"
                                    id="nominee_nid"
                                    value={nomineInfo.nominee_nid}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="nominee_relation"
                                    className="form-label"
                                >
                                    Relation
                                </label>
                                <input
                                    type="text"
                                    name="nominee_relation"
                                    className="form-control"
                                    id="nominee_relation"
                                    value={nomineInfo.nominee_relation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <button
                                    className="add-to-cart-link border-0 mx-auto"
                                    type="submit"
                                    disabled={isPending}
                                    style={{
                                        cursosEvents: isPending
                                            ? "none"
                                            : "pointer",
                                        opacity: isPending ? "0.5" : "1",
                                    }}
                                >
                                    {isPending ? (
                                        <div
                                            style={{
                                                height: "21px",
                                                width: "96px",
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
                                        "Update Info"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageNomineeInfo;
