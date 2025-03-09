"use client"
import { getDistrictForShipping } from "@/app/services/getDistrictForShipping";
import { postShippingAddress } from "@/app/services/postShippingAddress";
import { updateShippingAddress } from "@/app/services/updateShippingAddress";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const ShippingAddressModal = ({ currentAddress, session, liveUpdate, setLiveUpdate }) => {
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newDistrict, setNewDistrict] = useState("");
    const modalRef = useRef(null);
    const [districtsData, setDistrictsData] = useState([]);

    const [bootstrap, setBootstrap] = useState(null);

    // Dynamically import bootstrap bundle on the client-side
    useEffect(() => {
        const loadBootstrap = async () => {
            const bootstrapModule = await import(
                "bootstrap/dist/js/bootstrap.bundle.min.js"
            );
            setBootstrap(bootstrapModule);
        };
        loadBootstrap();
    }, []);

    useEffect(() => {
        if (currentAddress) {
            setNewEmail(currentAddress.email || "");
            setNewPhone(currentAddress.phone || "");
            setNewAddress(currentAddress.address || "");
            setNewCity(currentAddress.city || "");
            setNewDistrict(currentAddress.district_id || "");
        }
        if (!currentAddress && session) {
            setNewEmail(session?.user?.email || "");
            setNewPhone(session?.user?.phone || "");
        }
    }, [currentAddress, session]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const totalDistrict = await getDistrictForShipping();
                setDistrictsData(totalDistrict?.results?.districts || []);
            } catch (error) {
                console.error("Failed to fetch districts:", error);
            }
        };
        fetchDistricts();
    }, []);

    let addAddressInfo = {
        email: newEmail,
        phone: newPhone,
        district_id: parseInt(newDistrict),
        city: newCity,
        address: newAddress,
        set_default: currentAddress ? currentAddress.set_default : 1,
    };
    if (currentAddress) {
        const address_id = currentAddress?.id;
        addAddressInfo = { address_id, ...addAddressInfo }
    }
    if (!currentAddress) {
        const full_name = session?.user?.name;
        addAddressInfo = { full_name, ...addAddressInfo }
    }

    const handleUpdateShippingAddress = async (e) => {
        e.preventDefault();
        if (currentAddress) {
            try {
                const response = await updateShippingAddress(addAddressInfo, session?.accessToken);
                if (response.code === 200) {
                    // Close the modal if the response is successful
                    if (bootstrap && modalRef.current) {
                        const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
                        modalInstance.hide();
                    }
                    toast.success(response.message);
                    setLiveUpdate(!liveUpdate);
                }else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.error("Failed to update shipping address:", error);
                toast.error(error.message)
            }
        }
        else {
            try {
                const response = await postShippingAddress(addAddressInfo, session?.accessToken);
                if (response.code === 200) {
                    // Close the modal if the response is successful
                    if (bootstrap && modalRef.current) {
                        const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
                        modalInstance.hide();
                    }
                    toast.success(response.message)
                    setLiveUpdate(!liveUpdate);
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.error("Failed to add shipping address:", error);
                toast.error(error.message)
            }
        }
    };

    return (
        <>
            <div
                className="modal fade modal-lg"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title customer-dashboard-title"
                                id="exampleModalLabel"
                            >
                                Shipping Address
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="shipping-form-area">
                                <form onSubmit={handleUpdateShippingAddress}>
                                    <div className="px-3 row">
                                        <div className="col-md-6 pb-3">
                                            <label
                                                htmlFor="mobile"
                                                className="form-label"
                                            >
                                                Mobile Number
                                                <span className="text-danger fw-bold">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="mobile"
                                                className="form-control"
                                                id="mobile"
                                                value={newPhone}
                                                onChange={(e) => setNewPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 pb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email (Optional)
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="email"
                                                value={newEmail}
                                                onChange={(e) => setNewEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 pb-3">
                                            <label
                                                htmlFor="district"
                                                className="form-label"
                                            >
                                                District
                                                <span className="text-danger fw-bold">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                className="form-select district-list"
                                                name="district"
                                                id="district"
                                                value={newDistrict}
                                                onChange={(e) => setNewDistrict(e.target.value)}
                                                required
                                            >
                                                <option value="">Select District</option>
                                                {districtsData?.map((district, index) => (
                                                    <option
                                                        key={index}
                                                        value={district?.id}
                                                    >
                                                        {district?.name}
                                                    </option>
                                                )
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-md-6 pb-3">
                                            <label
                                                htmlFor="city"
                                                className="form-label"
                                            >
                                                City
                                                <span className="text-danger fw-bold">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                id="city"
                                                value={newCity}
                                                onChange={(e) => setNewCity(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12 pb-3">
                                            <label
                                                htmlFor="address"
                                                className="form-label"
                                            >
                                                Address
                                                <span className="text-danger fw-bold">
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                name="address"
                                                id="address"
                                                className="form-control textarea-resize"
                                                rows="2"
                                                value={newAddress}
                                                onChange={(e) => setNewAddress(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="add-to-cart-link bg-danger border-0"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <input
                                            type="submit"
                                            className="add-to-cart-link border-0"
                                            value="Save changes"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingAddressModal;
