import React from 'react'

const FinanceTopTitle = ({title=""}) => {
    return (
        <>
            <div className="customer-dashboard-order-history-title d-flex align-items-center justify-content-between">
                <h1 className="customer-dashboard-title mb-0">{title}</h1>
            </div>
        </>
    )
}

export default FinanceTopTitle
