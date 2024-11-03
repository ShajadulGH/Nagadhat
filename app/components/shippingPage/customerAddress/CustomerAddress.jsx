"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { shippingChare } from "@/app/services/getShipping";
import { showToast } from "@/app/components/Toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCustomerAllShippingAddress } from "@/app/services/getShippingCustomerAddresses";
import { deleteBuyNowProductData, getBuyNowProductData } from "@/app/utils";
import { placeOrder } from "@/app/services/postPlaceOrder";
import { postShippingAddress } from "@/app/services/postShippingAddress";
import { updateShippingAddress } from "@/app/services/updateShippingAddress";
import { pickUpPontes } from "@/app/services/pickupPoint";
import { getDistrictForShipping } from "@/app/services/getDistrictForShipping";
import DeliveryAddressModal from "./DeliveryAddressModal";
import AddNewDeliveryAddress from "./AddNewDeliveryAddress";
import { getAllPickUpPontes } from "@/app/services/getAllPickupPoint";

const CustomerAddress = ({
  setPickUpIdForOrder,
  setShippingPrice,
  setDeliveryNote,
  customerAddress, 
  setCustomerAddress,
  selectedDefaultAddressId, 
  setSelectedDefaultAddressId,
  cartProduct, 
  setCartProduct
}) => {
  const { status, data: session } = useSession();

  // State variables
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    district: "",
    city: "",
    address: "",
    note: "",
    setDefault: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editedAddressId, setEditAddressId] = useState(null);
  // const [cartProduct, setCartProduct] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [pickUpPoint, setPickUpPoint] = useState([]);
  const [pickUpId, setPickUpPointId] = useState(null);
  const [districtsData, setDistrictsData] = useState([]);
  // const [selectedDefaultAddressId, setSelectedDefaultAddressId] = useState(null);
  const [outletId, setOutletId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("outletId") || 3;
    }
    return 3;
  });

  // Utility functions
  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.district) errors.district = "District is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  const findObjectWithKey = (array, key, value) => array.find((obj) => obj[key] === value);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };


  const handleSetDefaultAddress = (id) => {
    const address = customerAddress.find((address) => address.id === id);
    setFormData({
      fullName: address?.full_name,
      phone: address?.phone,
      district: address?.district?.id,
      city: address?.city,
      address: address?.address,
      note: address?.note,
      setDefault: true,
    });
  };

  const handleChangeDefaultAddress = async (address_id) => {
    const addAddressInfo = {
      address_id: selectedDefaultAddressId,
      full_name: formData.fullName,
      phone: formData.phone,
      district_id: formData.district,
      city: formData.city,
      address: formData.address,
      note: formData.note,
      set_default: formData.setDefault ? 1 : 0,
    };
    await updateShippingAddress(addAddressInfo, session?.accessToken);
    const data = await getCustomerAllShippingAddress(session?.accessToken);
    setCustomerAddress(data.results || []);
    const defaultAddressInfo = findObjectWithKey(
      data.results,
      "set_default",
      1
    );
    setSelectedDefaultAddressId(defaultAddressInfo?.id);
    setPickUpIdForOrder(null)
    fetchShippingCharge();

    const modalElement = document.getElementById(
      "change-nhn-shipping-address"
    );

    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  const afterClickingEditButton = (id) => {
    setEditAddressId(id);
    const findDefaultAddress = customerAddress?.find(
      (address, index) => address.id == id
    );
    
    setFormData({
      fullName: findDefaultAddress?.full_name,
      phone: findDefaultAddress?.phone,
      district: findDefaultAddress?.district?.id,
      city: findDefaultAddress?.city,
      address: findDefaultAddress?.address,
      note: findDefaultAddress?.note,
      setDefault: true,
    });
  };

  const handlePickUpPoint = () => {
    if (pickUpId) {
      setPickUpIdForOrder(pickUpId);
      setShippingPrice(0);
    }
    const modalElement = document.getElementById(
      "shipping-pick-point-modal"
    );
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const data = await getCustomerAllShippingAddress(session?.accessToken);
          setCustomerAddress(data.results || []);

          const defaultAddressInfo = findObjectWithKey(data.results, "set_default", 1);
          setSelectedDefaultAddressId(defaultAddressInfo?.id);

          // const pickUpPoint = await pickUpPontes(outletId);
          // setPickUpPoint(pickUpPoint);
          const pickUpPoint = await getAllPickUpPontes();
          setPickUpPoint(pickUpPoint);

          const totalDistrict = await getDistrictForShipping();
          setDistrictsData(totalDistrict?.results?.districts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail") || session?.user?.email;
    setUserEmail(savedEmail);
  }, [session]);

  // useEffect(() => {
  //   const buyNowData = async () => {
  //     const cartProducts = getBuyNowProductData();
  //     setCartProduct(cartProducts);
  //   };
  //   buyNowData();
  // }, [session]);

  const fetchShippingCharge = async () => {
    if (cartProduct?.length > 0 && selectedDefaultAddressId) {
      const shippingChargeFinder = await shippingChare(
        cartProduct[0]?.product_id,
        session?.accessToken
      );
      const shippingChargeFind = shippingChargeFinder?.results?.shipping_charge;
      setShippingPrice(shippingChargeFind);
    }
  };
  useEffect(() => {
    fetchShippingCharge();
  }, [cartProduct, selectedDefaultAddressId]);

  // Helper functions
  const resetFormData = () => {
    setFormData({
      fullName: "",
      phone: "",
      district: "",
      city: "",
      address: "",
      note: "",
      setDefault: false,
    });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setTempEmail(email);

    if (!validateEmail(email)) {
      setMailError("Invalid email address.");
    } else {
      setMailError("");
    }
  };

  const handleSaveEmail = () => {
    if (!mailError && tempEmail) {
      setUserEmail(tempEmail);
      localStorage.setItem("userEmail", tempEmail);

      const modalElement = document.getElementById("edit-mail-shipping-modal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }
  };

  const handleUpdateDeliveryAddress = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsOpen(false);
      return;
    }
    const addAddressInfo = {
      address_id: editedAddressId,
      full_name: formData.fullName,
      phone: formData.phone,
      district_id: formData.district,
      city: formData.city,
      address: formData.address,
      note: formData.note,
      set_default: formData.setDefault ? 1 : 0,
    };
    await updateShippingAddress(addAddressInfo, session?.accessToken);
    const data = await getCustomerAllShippingAddress(session?.accessToken);
    setCustomerAddress(data.results || []);
    const defaultAddressInfo = findObjectWithKey(
      data.results,
      "set_default",
      1
    );
    setSelectedDefaultAddressId(defaultAddressInfo?.id);
    fetchShippingCharge();

    // Hide modal after update
    const modalElement = document.getElementById("updatedeliveryaddress");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    setIsOpen(true);

    // Reset form data
    setFormData({
      fullName: "",
      phone: "",
      district: "",
      city: "",
      address: "",
      note: "",
      setDefault: false,
    });
  };

  const handleAddDeliveryAddress = async () => {
    // Validate form data
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsOpen(false);
      return;
    }
    // Prepare address information
    const addAddressInfo = {
      full_name: formData.fullName,
      phone: formData.phone,
      district_id: formData.district,
      city: formData.city,
      address: formData.address,
      note: formData.note,
      set_default: formData.setDefault ? 1 : 0,
    };

    // Send address information to the server
    await postShippingAddress(addAddressInfo, session?.accessToken);
    // Fetch updated list of shipping addresses
    const data = await getCustomerAllShippingAddress(session?.accessToken);
    setCustomerAddress(data.results || []);
    const defaultAddressInfo = findObjectWithKey(
      data.results,
      "set_default",
      1
    );
    setSelectedDefaultAddressId(defaultAddressInfo?.id);
    // Close the modal
    const modalElement = document.getElementById("addnewdeliveryaddress");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    // Reset form data
    setFormData({
      fullName: "",
      phone: "",
      district: "",
      city: "",
      address: "",
      note: "",
      setDefault: false,
    });
  };

  return (
    <div>
      {customerAddress?.filter(address => address.set_default === 1).map((address, index) => (
        <div key={index} className="row nhn-shipping-deliver-detail-area">
          <div className="col-md-12">
            <div className="nhn-shipping-deliver-detail rounded-2 flex-column d-flex gap-2">
              <div className="nhn-shipping-deliver-title">
                <p>Deliver to: {address?.full_name} </p>
              </div>
              <div className="nhn-shipping-deliver-detail-info">
                <p>
                  <span className="text-capitalize">Mobile</span>{" "}
                  <small> {address?.phone} {" "} </small> | {address?.address} {" "}
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#change-nhn-shipping-address"
                  >
                    Change
                  </button>
                </p>
              </div>

              {/* Change Shipping Address Modal */}
              <div
                className="modal fade change-nhn-shipping-address-modal"
                id="change-nhn-shipping-address"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <p className="modal-title">My delivery Address</p>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row g-2">
                        {customerAddress?.map((allAddress, index) => (
                          <div key={index} className="col-md-6 col-sm-12">
                            <div className="shipping-delivery-address-radiobox">
                              <input
                                id={`radio${index}`}
                                type="radio"
                                name="license-radios"
                                value={allAddress?.set_default}
                                className="shipping-delivery-address-radio"
                                defaultChecked={allAddress.set_default === 1}
                                onChange={() => handleSetDefaultAddress(allAddress?.id)}
                              />
                              <label htmlFor={`radio${index}`}>
                                <span className="license_type_circle"></span>
                                <div className="shipping-delivery-radio-info d-flex flex-column gap-2">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <p>{allAddress?.full_name}</p>
                                    <button
                                      className="text-uppercase"
                                      data-bs-toggle="modal"
                                      data-bs-target="#updatedeliveryaddress"
                                      onClick={() => afterClickingEditButton(allAddress?.id)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <span>{allAddress?.phone}</span>
                                  <p>{allAddress?.address}</p>
                                  <div className="shipping-delivery-radio-info-tag d-flex align-items-center gap-2">
                                    <span className="text-capitalize">mobile</span>
                                    <span>default delivery address</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn d-flex align-items-center justify-content-center gap-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addnewdeliveryaddress"
                      >
                        <div className="new-nh-add-address-btn">
                          <Image
                            fill={true}
                            src="/images/nh-shipping-plus-img.png"
                            alt="shipping-plus-img"
                          />
                        </div>
                        <span className="text-capitalize">add new delivery address</span>
                      </button>
                      <button
                        type="button"
                        className="btn add-to-cart-link"
                        onClick={() => handleChangeDefaultAddress(address?.id)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pick-up Point Section */}
              <div className="nhn-shipping-deliver-pic-point rounded-3">
                <p>
                  Collect your parcel from the nearest Nagadhat Pick-up Point with a reduced shipping fee.
                  Check{" "}
                  <button data-bs-toggle="modal" data-bs-target="#shipping-pick-point-modal">
                    Pick-up Points
                  </button>
                </p>
              </div>

              {/* Pick-up Point Modal */}
              <div
                className="modal fade shipping-pick-point-modal change-nhn-shipping-address-modal"
                id="shipping-pick-point-modal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <p className="modal-title">Pick-up Points</p>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row g-2">
                        {pickUpPoint?.map((item, id) => (
                          <div
                            key={id}
                            className="col-md-6 col-sm-12"
                            onClick={() => setPickUpPointId(item?.id)}
                          >
                            <div className="shipping-delivery-address-radiobox">
                              <input
                                id={`pickUpRadio${id}`}
                                type="radio"
                                name="license-radios"
                                className="shipping-delivery-address-radio"
                              />
                              <label htmlFor={`pickUpRadio${id}`}>
                                <span className="license_type_circle"></span>
                                <div className="shipping-delivery-radio-info d-flex flex-column gap-2">
                                  <div className="d-flex justify-content-between flex-column">
                                    <p>{item?.name}</p>
                                    <p>
                                      {item?.open} - {item?.close}
                                    </p>
                                  </div>
                                  <p>{item?.address}</p>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button
                        type="button"
                        className="btn add-to-cart-link w-100"
                        onClick={handlePickUpPoint}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="nhn-shipping-deliver-edit-mail">
                <p>
                  Email to: {userEmail}{" "}
                  <button type="button" data-bs-toggle="modal" data-bs-target="#edit-mail-shipping-modal">
                    Edit
                  </button>
                </p>
              </div>

              {/* Note Section */}
              <div className="nhn-shipping-deliver-edit-mail">
                <div className="py-3 d-flex align-items-center gap-3">
                  <label htmlFor="delivery_note" className="text-capitalize">
                    Note
                  </label>
                  <div className="w-50">
                    <input
                      type="text"
                      name="delivery_note"
                      className="form-control"
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      placeholder="Enter Note"
                    />
                  </div>
                </div>
              </div>

              {/* Edit Email Modal */}
              <div
                className="modal fade nhn-shipping-deliver-edit-mail-modal"
                id="edit-mail-shipping-modal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <p className="modal-title">Email</p>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="shipping-deliver-edit-mail-input">
                          <label htmlFor="edit-email" className="form-label">Email</label>
                          <input
                            type="email"
                            name="edit-email"
                            value={tempEmail}
                            className="form-control"
                            id="edit-email"
                            onChange={handleEmailChange}
                          />
                          {mailError && <p style={{ color: "red" }}>{mailError}</p>}
                        </div>
                        <div className="modal-footer justify-content-center">
                          <button
                            type="button"
                            className="btn add-to-cart-link w-100"
                            onClick={handleSaveEmail}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add New Address Button */}
      {customerAddress?.length == 0 && (
        <div className="row new-nh-shipping-row">
          <div className="col-12">
            <div className="new-nh-shipping-area d-flex justify-content-center rounded-2">
              <button
                type="button"
                className="btn d-flex align-items-center justify-content-center gap-2"
                data-bs-toggle="modal"
                data-bs-target="#addnewdeliveryaddress"
              >
                <div className="new-nh-add-address-btn">
                  <Image
                    fill={true}
                    src="/images/nh-shipping-plus-img.png"
                    alt="shipping-plus-img"
                  />
                </div>
                <span className="text-capitalize">add new delivery address</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {update shipping address modal} */}
      <DeliveryAddressModal
        handleUpdateDeliveryAddress={handleUpdateDeliveryAddress}
        formData={formData}
        handleChange={handleChange}
        validationErrors={validationErrors}
        districtsData = {districtsData}
        isOpen ={isOpen}
      />

      {/* {add new shipping address modal} */}
      <AddNewDeliveryAddress
        handleAddDeliveryAddress={handleAddDeliveryAddress}
        formData={formData}
        handleChange={handleChange}
        validationErrors={validationErrors}
        districtsData = {districtsData}
        isOpen ={isOpen}
      />

    </div>
  )
}

export default CustomerAddress
