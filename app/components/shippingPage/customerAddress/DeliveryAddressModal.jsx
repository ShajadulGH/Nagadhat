"use client";
import React from "react";

const DeliveryAddressModal = ({
    handleUpdateDeliveryAddress,
    formData,
    handleChange,
    validationErrors,
    districtsData,
    isOpen
}) => {
    return (
        <div
            className={`modal fade new-nh-delivery-address-modal ${isOpen ? 'show' : ''}`}
            id="updatedeliveryaddress"
            tabIndex="-1"
            aria-hidden={!isOpen}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="text-capitalize">Edit delivery address</p>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 pb-3">
                                    <label htmlFor="full-name" className="form-label">
                                        Full Name
                                        <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        id="full-name"
                                        value={formData?.fullName || ''}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.fullName && (
                                        <span className="text-danger">
                                            {validationErrors.fullName}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 pb-3">
                                    <label htmlFor="mobile" className="form-label">
                                        Mobile Number <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="phone"
                                        className="form-control"
                                        id="mobile"
                                        value={formData?.phone || ''}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.phone && (
                                        <span className="text-danger">
                                            {validationErrors.phone}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 pb-3">
                                    <label htmlFor="district" className="form-label">
                                        District <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="district"
                                        id="district"
                                        value={formData?.district || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select District</option>
                                        {districtsData?.map((district, index) => (
                                            <option key={index} value={district?.id}>
                                                {district?.name}
                                            </option>
                                        ))}
                                    </select>
                                    {validationErrors.district && (
                                        <span className="text-danger">
                                            {validationErrors.district}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 pb-3">
                                    <label htmlFor="city" className="form-label">
                                        City
                                        <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        id="city"
                                        value={formData?.city || ''}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.city && (
                                        <span className="text-danger">
                                            {validationErrors.city}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-12 pb-3">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                        <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        id="address"
                                        className="form-control textarea-resize"
                                        rows="2"
                                        value={formData?.address || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                    {validationErrors.address && (
                                        <span className="text-danger">
                                            {validationErrors.address}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-12 pb-3">
                                    <label htmlFor="note" className="form-label">
                                        Note
                                    </label>
                                    <textarea
                                        className="form-control textarea-resize"
                                        name="note"
                                        id="note"
                                        rows="2"
                                        value={formData?.note || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="address-book"
                                            name="setDefault"
                                            checked={formData?.setDefault || false}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label text-capitalize" htmlFor="address-book">
                                            Default delivery address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn add-to-cart-link"
                            data-bs-dismiss={isOpen ? "modal" : ""}
                            onClick={handleUpdateDeliveryAddress}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddressModal;
