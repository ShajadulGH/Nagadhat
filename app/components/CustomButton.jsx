import React from "react";

const CustomButton = ({
    children,
    className,
    id,
    dataBsToggle,
    dataBsTarget,
    type,
    role,
}) => {
    return (
        <button
            className={className}
            id={id}
            data-bs-toggle={dataBsToggle}
            data-bs-target={dataBsTarget}
            type={type}
            role={role}
            aria-selected={false}
        >
            {children}
        </button>
    );
};

export default CustomButton;
