import React from "react";

const LodingFixed = () => {
    return (
        <div
            className="position-fixed"
            style={{
                top: "50%",
                left: "50%",
                zIndex: "5",
            }}
        >
                <div class="backdrop">
            <div class="bar-loader">
                <div class="bar"></div>
            </div>
            </div>
        </div>
    );
};

export default LodingFixed;
