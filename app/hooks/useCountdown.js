"use client";
import { useState, useRef, useEffect } from "react";

function useCountdown(endsAt) {
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");

    const getTimeRemaining = (e) => {
        const milliseconds = Date.parse(e) - Date.parse(new Date());
        let seconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600; // Remaining seconds after calculating hours
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        return {
            total: milliseconds,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);

        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                    ":" +
                    (minutes > 9 ? minutes : "0" + minutes) +
                    ":" +
                    (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(new Date(endsAt));
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    let newTimer = timer;

    return newTimer.split(":");
}

export default useCountdown;
