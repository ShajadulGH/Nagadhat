"use client";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BootstrapProvider = ({ children }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("bootstrap/dist/js/bootstrap.bundle.min.js");
        }
    }, []);

    return <>{children}</>;
};

export default BootstrapProvider;
