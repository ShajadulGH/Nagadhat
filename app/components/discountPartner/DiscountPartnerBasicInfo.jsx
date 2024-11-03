"use client";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import { getServiceCategoryWithDiscountPartner } from "@/app/services/discountPartner/getServiceCategoryWithDiscountPartner";

const DiscountPartnerBasicInfo = ({ handleTabClick, setFormData, formData }) => {
    const [category, setCategory] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onDropLogo = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFormData((prevData) => ({
            ...prevData,
            logo: file,
        }));
    };

    const onDropGallery = (acceptedFiles) => {
        setFormData((prevData) => ({
            ...prevData,
            gallery: [...prevData.gallery, ...acceptedFiles],
        }));
    };

    const removeLogo = (e) => {
        e.stopPropagation();
        setFormData((prevData) => ({
            ...prevData,
            logo: null,
        }));
    };

    const removeGalleryImage = (indexToRemove, e) => {
        e.stopPropagation();
        setFormData((prevData) => ({
            ...prevData,
            gallery: prevData.gallery.filter((_, index) => index !== indexToRemove),
        }));
    };

    // get category list
    useEffect(() => {
        const getCategoryList = async () => {
            // fetch data from API
            const response = await getServiceCategoryWithDiscountPartner();
            setCategory(response?.results);
        };
        getCategoryList();
    }, []);

    return (
        <div className="accordion-item border-0 rounded-bottom">
            <ToastContainer />
            <div
                id="flush-collapseOne"
                className="accordion-collapse collapse border-top show"
                data-bs-parent="#accordionFlushExample"
            >
                <div className="accordion-body">
                    <div className="customer-manage-profile-from-area">
                        <form
                            className="row"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleTabClick("contact-info");
                            }}
                        >
                            <div className="col-md-6 pb-3">
                                <label htmlFor="company_name" className="form-label">
                                    Company Name: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company_name"
                                    className="form-control"
                                    id="company_name"
                                    placeholder="Enter company name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="owner-name" className="form-label">
                                    Owner Name: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="owner_name"
                                    className="form-control"
                                    id="owner-name"
                                    placeholder="Enter owner's name"
                                    required
                                    value={formData.owner_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="location" className="form-label">
                                    Location: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    id="location"
                                    placeholder="Enter location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="service_category" className="form-label">
                                    Service Category: <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="service_category"
                                    id="service_category"
                                    required
                                    value={formData.service_category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {category.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="logo" className="form-label">
                                    Company Logo:
                                </label>
                                <Dropzone onDrop={onDropLogo}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="form-control">
                                            <div className="text-center p-3 overflow-hidden" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div style={{ width: "100%", height: "150px" }}>
                                                    {!formData?.logo ? (
                                                        <div className="opacity-50">
                                                            <p className="fs-1">
                                                                <IoCloudUploadOutline />
                                                            </p>
                                                            <h3>Drop Logo</h3>
                                                            <p>Drag 'n' drop a logo, or click to select file</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center position-relative">
                                                            <Image
                                                                height={150}
                                                                width={150}
                                                                src={URL.createObjectURL(formData?.logo)}
                                                                alt="Company Logo"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle"
                                                                onClick={(e) => removeLogo(e)}
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="gallery" className="form-label">
                                    Photo Gallery:
                                </label>
                                <Dropzone onDrop={onDropGallery}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="form-control">
                                            <div className="text-center p-3 overflow-y-auto" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div style={{ width: "100%", height: "150px" }}>
                                                    {formData?.gallery.length === 0 ? (
                                                        <div className="opacity-50">
                                                            <p className="fs-1">
                                                                <IoCloudUploadOutline />
                                                            </p>
                                                            <h3>Drop Gallery</h3>
                                                            <p>Drag 'n' drop gallery photos, or click to select files</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            {formData?.gallery.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="d-inline-block position-relative"
                                                                >
                                                                    <Image
                                                                        className="my-2 mx-3 border"
                                                                        height={70}
                                                                        width={100}
                                                                        src={URL.createObjectURL(file)}
                                                                        alt={`Gallery Image ${index + 1}`}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm py-0 position-absolute top-0 start-100 translate-middle"
                                                                        onClick={(e) => removeGalleryImage(index, e)}
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>

                            <div className="d-flex justify-content-end gap-4">
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

export default DiscountPartnerBasicInfo;
