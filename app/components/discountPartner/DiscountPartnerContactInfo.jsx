"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscountPartnerContactInfo = ({ handleTabClick, formData, setFormData }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="accordion-item mb-4 border-0 rounded-bottom">
            <ToastContainer />
            <div>
                <div className="accordion-body">
                    <div className="customer-manage-profile-from-area">
                        <form
                            className="row"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleTabClick("business-info");
                                // Submit form data to server here
                            }}
                        >
                            <div className="col-md-6 pb-3">
                                <label htmlFor="business_contact_number" className="form-label">
                                    Business Contact Number: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="business_contact_number"
                                    className="form-control"
                                    id="business_contact_number"
                                    placeholder="Enter business contact number"
                                    value={formData.business_contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="business_email" className="form-label">
                                    Business Email: (optional)
                                </label>
                                <input
                                    type="text"
                                    name="business_email"
                                    className="form-control"
                                    id="business_email"
                                    placeholder="Enter business email"
                                    value={formData.business_email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="responsible_person_name"
                                    className="form-label"
                                >
                                    Responsible Person Name: (optional)
                                </label>
                                <input
                                    type="text"
                                    name="responsible_person_name"
                                    className="form-control"
                                    id="responsible_person_name"
                                    placeholder="Enter responsible person's name"
                                    value={formData.responsible_person_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="responsible_person_contact"
                                    className="form-label"
                                >
                                    Responsible Person Contact: (optional)
                                </label>
                                <input
                                    type="text"
                                    name="responsible_person_contact"
                                    className="form-control"
                                    id="responsible_person_contact"
                                    placeholder="Enter responsible person's contact"
                                    value={formData.responsible_person_contact}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="responsible_person_email"
                                    className="form-label"
                                >
                                    Responsible Person Email: (optional)
                                </label>
                                <input
                                    type="text"
                                    name="responsible_person_email"
                                    className="form-control"
                                    id="responsible_person_email"
                                    placeholder="Enter responsible person's email"
                                    value={formData.responsible_person_email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end gap-4">
                                <button
                                    type="button"
                                    className="add-to-cart-link border-0 bg-danger"
                                    onClick={() => handleTabClick("basic-info")}
                                >
                                    Back
                                </button>
                                <input
                                    type="submit"
                                    className="add-to-cart-link border-0"
                                    title="Next"
                                    value="Next"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountPartnerContactInfo;
