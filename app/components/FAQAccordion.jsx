import React from 'react'

const FAQAccordion = ({title,faqData}) => {
    return (
        <div>
            <div className="customer-manage-profile-title bg-info-subtle praymary-color">
                <h1 className="customer-dashboard-title mb-0">{title}</h1>
            </div>
            <div className="customer-manage-profile-info">
                <div
                    className="accordion accordion-flush rounded-bottom"
                    id="accordionFlushExample"
                >
                    {faqData.map((faq, index) => (
                        <div className="accordion-item border-0 rounded mb-4 shadow-sm" key={faq.id}>

                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed bg-white rounded customer-dashboard-subtitle"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${faq.id}`}
                                    aria-controls={faq.id}
                                    aria-expanded="false"
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div
                                id={faq.id}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQAccordion
