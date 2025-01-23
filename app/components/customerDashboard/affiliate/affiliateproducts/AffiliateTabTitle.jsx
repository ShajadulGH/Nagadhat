"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export const AffiliateTabTitle = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "resale-tab";

    useEffect(() => {
        const tabElement = document.getElementById(tab);
        if (tabElement) {
            tabElement.click();
        }
    }, [tab]);

    const handleTabClick = (tabId) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("tab", tabId);
        window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${newSearchParams.toString()}`
        );
    };

    return (
        <>
            <div className="customer-setting-header tab-header border-0">
                <ul
                    className="nav nav-pills d-flex tab-continer gap-2"
                    id="myTab"
                    role="tablist"
                >
                    <li className="nav-item">
                        <button
                            className={`nav-link ${
                                tab === "resale-tab" ? "active" : " "
                            } rounded-3`}
                            id="resale-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#resale"
                            type="button"
                            role="tab"
                            onClick={() => handleTabClick("resale-tab")}
                            style={{ border:"1px solid #44bc9d" }}
                        >
                            FBNH (Resell)
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${
                                tab === "container-booking-tab" ? "active" : ""
                            } rounded-3 `}
                            id="container-booking-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#container-booking"
                            type="button"
                            role="tab"
                            onClick={() =>
                                handleTabClick("container-booking-tab")
                            }
                            style={{ border:"1px solid #44bc9d" }}
                        >
                            Container Booking
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${
                                tab === "retails-tab" ? "active" : ""
                            } rounded-3 `}
                            id="retails-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#retails"
                            type="button"
                            role="tab"
                            onClick={() => handleTabClick("retails-tab")}
                            style={{ border:"1px solid #44bc9d" }}
                        >
                            Retails
                        </button>
                    </li>

                    {/* <li className="nav-item">
                        <button
                            className={`nav-link ${
                                tab === "properties-tab" ? "active" : ""
                            } rounded-0`}
                            id="properties-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#properties"
                            type="button"
                            role="tab"
                            onClick={() => handleTabClick("properties-tab")}
                        >
                            Properties
                        </button>
                    </li> */}
                </ul>
            </div>
        </>
    );
};
