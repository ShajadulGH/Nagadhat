import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import logo from "@/public/images/nagadhat-squire-logo.jpeg"
import handshake from "@/public/images/handshake.gif"
import transparant from "@/public/images/transparant-blank.png"
import { postDiscountPartnerInfo } from '@/app/services/discountPartner/postDiscountPartnerInfo';

const DiscountPartnerComfarmModal = ({ formData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const confirmSubmitForm = async () => {
        // Create FormData to handle file uploads
        const formDataToSend = new FormData();

        // Append regular fields
        formDataToSend.append("company_name", formData.company_name);
        formDataToSend.append("owner_name", formData.owner_name);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("category", formData.service_category);
        formDataToSend.append("business_contact", formData.business_contact_number);
        formDataToSend.append("business_email", formData.business_email);
        formDataToSend.append("responsible_person_name", formData.responsible_person_name);
        formDataToSend.append("responsible_person_contact", formData.responsible_person_contact);
        formDataToSend.append("responsible_person_email", formData.responsible_person_email);
        formDataToSend.append("trade_license_number", formData.trade_license_number);
        formDataToSend.append("tin_vat_number", formData.tin_vat);
        formDataToSend.append("facebook_url", formData.facebook_link);
        formDataToSend.append("website_url", formData.website_link);
        formDataToSend.append("applicability", formData.applicability);
        formDataToSend.append("company_brief", formData.company_brief);
        formDataToSend.append("offer_details", formData.offer_details);

        // Append files if they exist
        if (formData.logo) {
            formDataToSend.append("logo", formData.logo); // Assuming formData.logo is a file
        }
        if (formData.gallery) {
            formData.gallery.forEach((file, index) => {
                formDataToSend.append(`images[${index}]`, file); // Append each file from gallery
            });
        }
        if (formData.trade_license_copy) {
            formDataToSend.append("trade_license_copy", formData.trade_license_copy);
        }
        if (formData.tin_vat_copy) {
            formDataToSend.append("tin_vat_copy", formData.tin_vat_copy);
        }

        try {
            setLoading(true);
            const response = await postDiscountPartnerInfo(formDataToSend); // Send as FormData
            if (response.code === 200) {
                // Handle successful response
                const modalElement = document.getElementById('exampleModal');
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                }
                // emty formData
                router.push(`/success-discount-partner?id=${response.results.id}`);
            } else {
                const modalElement = document.getElementById('exampleModal');
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                }
                toast.error(response.message);
                // Swal.fire({
                //     icon: "error",
                //     title: "Oops...",
                //     text: response?.message
                // });
            }
        } catch (error) {
            console.error("Submission Error: ", error);
        } finally {
            setLoading(false);
        };
    };


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Nagadhat MoU Registration</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <Image className="img-fluid" src={logo} width="100" height="100" alt="Nagadhat Logo" />
                            </div>
                            <div>
                                <Image className="img-fluid" src={handshake} width="100" height="100" alt="Handshake" />
                            </div>
                            <div>
                                <Image className="img-fluid" src={formData.logo ? URL.createObjectURL(formData.logo) : transparant} width="100" height="100" alt="Nagadhat Logo" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="font-weight-bold mt-2">MoU Form</h4>
                            <p>
                                Nagadhat Bangladesh Ltd
                                <br />
                                Khaja Super Market, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.
                            </p>
                        </div>
                        <hr />
                        <div className="col-md-12 bg-success mb-3">
                            <h5 className="text-white font-weight-bolder">Basic Info</h5>
                        </div>
                        <div className="form-group row">
                            <label className="font-weight-bold col-sm-3" htmlFor="serviceCategory">
                                Service Category:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_service_category">{formData?.service_category || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="font-weight-bold col-sm-3" htmlFor="companyName">
                                Company Name:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_company_name">{formData?.company_name || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="location">
                                Location:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_location">{formData?.location || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="ownerName">
                                Owner Name:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_owner_name">{formData?.owner_name || 'N/A'}</span>
                            </div>
                        </div>

                        <hr />
                        <div className="col-md-12 bg-success mb-3">
                            <h5 className="text-white font-weight-bolder">Contact Info</h5>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="contactNumber">
                                Business Contact Number:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_business_contact">{formData?.business_contact_number || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="contactEmail">
                                Business Email:
                            </label>
                            <div className="col-sm-9">
                                <span id="value_business_email">{formData?.business_email || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="responsiblePersonName">
                                Responsible Person Name:
                            </label>
                            <div className="col-md-9">
                                <span id="value_responsible_person_name">{formData?.responsible_person_name || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="responsiblePersonContact">
                                Responsible Person Contact:
                            </label>
                            <div className="col-md-9">
                                <span id="value_responsible_person_contact">{formData?.responsible_person_contact || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 font-weight-bold" htmlFor="responsiblePersonEmail">
                                Responsible Person Email:
                            </label>
                            <div className="col-md-9">
                                <span id="value_responsible_person_email">{formData?.responsible_person_email || 'N/A'}</span>
                            </div>
                        </div>

                        <hr />
                        <div className="col-md-12 bg-success mb-3">
                            <h5 className="text-white font-weight-bolder">Business Info</h5>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 font-weight-bold" htmlFor="tradeLicenseNumber">
                                Trade License Number:
                            </label>
                            <div className="col-md-9">
                                <span id="value_trade_license_number">{formData?.trade_license_number || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 font-weight-bold" htmlFor="tinOrVat">
                                TIN / VAT:
                            </label>
                            <div className="col-md-9">
                                <span id="value_tin_vat_number">{formData?.tin_vat || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 font-weight-bold" htmlFor="companyBrief">
                                Company Brief:
                            </label>
                            <div className='col-md-9'>
                                <span id="value_company_brief">{formData?.company_brief || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className={`btn btn-primary ${loading ? 'disabled-button':""}`}
                            onClick={confirmSubmitForm}
                            disabled={loading}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountPartnerComfarmModal;
