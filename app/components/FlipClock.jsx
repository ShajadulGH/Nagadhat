"use client";
import useCountdown from "../hooks/useCountdown";
function FlipClock({ endsAt, isflashsalePage = false }) {
    let [hours, minutes, seconds] = useCountdown(endsAt);
    return (
        <>
            <div
                className={`nh-common-item d-flex align-items-center ${
                    isflashsalePage === true ? "is-flashsale-time-align" : ""
                }`}
            >
                <div className="flash-end-time">Ending in</div>
                <div className="flash-sale-end-time d-flex align-items-center">
                    <div className="flash-sale-end-time-box d-flex align-items-center justify-content-center">
                        <span>{hours}</span>
                    </div>
                    <div className="flash-sale-end-time-dot">:</div>

                    <div className="flash-sale-end-time-box d-flex align-items-center justify-content-center">
                        <span>{minutes}</span>
                    </div>
                    <div className="flash-sale-end-time-dot">:</div>

                    <div className="flash-sale-end-time-box d-flex align-items-center justify-content-center">
                        <span>{seconds}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FlipClock;
