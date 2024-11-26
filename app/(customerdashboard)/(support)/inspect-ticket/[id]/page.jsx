import React from "react";

const page = ({ params }) => {
    const paramId = params.id;
    return (
        <div className="h-100 customer-dashboard-card">
            <div className="px-4 py-3">
                <h1>Chat ID {paramId}</h1>
            </div>
        </div>
    );
};

export default page;
