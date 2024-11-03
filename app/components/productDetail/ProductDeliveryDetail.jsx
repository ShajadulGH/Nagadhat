"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { IoSearchOutline } from "react-icons/io5";
import DeliveryAddress from "./DeliveryAddress";
import { useSearchParams } from "next/navigation";
import { fetchShippingDivisions } from "@/app/services/getShippingDivision";
import { fetchShippingDistricts } from "@/app/services/getShippingDistricts";
import { fetchShippingUpazilla } from "@/app/services/getShippingUpazilla";

const ProductDeliveryDetail = ({ productInfo }) => {
    const [locationPopUp, setLocationPopUp] = useState(false);
    const [options, setOptions] = useState([]);
    const searchParams = useSearchParams();
    const pathName = searchParams.toString();
    const [selectedValues, setSelectedValues] = useState({
        division: null,
        district: null,
        upazilla: null,
    });
    const [step, setStep] = useState("division");
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("shippingLocation") ||
                  productInfo?.shipping_address
            : productInfo?.shipping_address
    );
    const [shippingAddress, setShippingAddress] = useState(null);
    const selectRef = useRef(null);
    useEffect(() => {
        if (step === "division") {
            fetchDivisions();
        } else if (step === "district" && selectedValues.division) {
            fetchDistricts(selectedValues.division.value);
        } else if (step === "upazilla" && selectedValues.district) {
            fetchUpazilla(
                selectedValues.division.value,
                selectedValues.district.value
            );
        }
    }, [step, selectedValues]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchDivisions = async () => {
        try {
            setLoading(true);
            const data = await fetchShippingDivisions();
            setOptions(
                data?.data.map((division) => ({
                    value: division?.division,
                    label: division?.division,
                }))
            );
        } catch (error) {
            console.error("Error fetching divisions:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDistricts = async (divisionName) => {
        try {
            setLoading(true);
            const data = await fetchShippingDistricts(divisionName);

            setOptions(
                data?.map((district) => ({
                    value: district?.district,
                    label: district?.district,
                }))
            );
        } catch (error) {
            console.error("Error fetching districts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpazilla = async (districtName, matchValue) => {
        try {
            setLoading(true);
            const data = await fetchShippingUpazilla(districtName, matchValue);

            setOptions(
                data?.map((upazilla) => ({
                    value: upazilla,
                    label: upazilla,
                }))
            );
        } catch (error) {
            console.error("Error fetching upazilla:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (selectedOption) => {
        if (step === "division") {
            setSelectedValues({
                division: selectedOption,
                district: null,
                upazilla: null,
            });
            setStep("district");
        } else if (step === "district") {
            setSelectedValues((prev) => ({
                ...prev,
                district: selectedOption,
                upazilla: null,
            }));
            setStep("upazilla");
        } else if (step === "upazilla") {
            setSelectedValues((prev) => ({
                ...prev,
                upazilla: selectedOption,
            }));
            setShowDropdown(false);
        }
    };
    const handleStartSelect = () => {
        setShowDropdown(true);
        setStep("division");
        setSelectedValues({ division: null, district: null, upazilla: null });
    };

    const DropdownIndicator = (props) => (
        <components.DropdownIndicator {...props}>
            <IoSearchOutline label="Emoji" />
        </components.DropdownIndicator>
    );

    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            {loading ? (
                <div className="locationLoader">
                    <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        color="red"
                        strokeColor="#aea8ab"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        menuIsOpen={true}
                        wrapperClass=""
                    />
                </div>
            ) : (
                "No options"
            )}
        </components.NoOptionsMessage>
    );

    useEffect(() => {
        selectedValues.division &&
        selectedValues.district &&
        selectedValues.upazilla
            ? setSelectedLocation(
                  `${selectedValues.division.label}, ${selectedValues.district.label}, ${selectedValues.upazilla.label}`
              )
            : setSelectedLocation(productInfo?.shipping_address);
    }, [selectedValues]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedAddress = localStorage.getItem("shippingLocation");
            setShippingAddress(savedAddress);
        }
    }, [pathName]);

    // Update localStorage whenever selectedLocation changes
    useEffect(() => {
        if (selectedLocation) {
            localStorage.setItem("shippingLocation", selectedLocation);
            setShippingAddress(selectedLocation); // Sync shippingAddress state with selectedLocation
        }
    }, [selectedLocation]);

    return (
        <div className="product-details-delivery-area">
            <div className="product-details-delivery-bg position-relative">
                <div className="product-delivery-top-title d-flex align-items-center justify-content-between">
                    <h2>shipping address</h2>
                    <div className="product-delivery-top-img">
                        <Image
                            className="img-fluid"
                            src="/images/delivery.svg"
                            alt="delivery image"
                            fill={true}
                        />
                    </div>
                </div>
                <div className="product-delivery-address-area d-flex justify-content-between ">
                    <div className="product-delivery-address-inner d-flex">
                        <div className="product-delivery-address-icon sidebar-common-img-size">
                            <Image
                                className="img-fluid"
                                src="/images/location-black-img.svg"
                                alt="location image"
                                fill={true}
                            />
                        </div>
                        <p>
                            {shippingAddress
                                ? shippingAddress
                                : "No Address Available"}
                        </p>
                    </div>
                    <div className="product-delivery-address-inner">
                        <Link
                            href="#"
                            className="custom-text-link"
                            onClick={handleStartSelect}
                        >
                            Change
                        </Link>
                    </div>
                </div>
                <div ref={selectRef} className="shippingAddressShowsOption">
                    {
                        <div>
                            {showDropdown && (
                                <div className="drop-down">
                                    <label htmlFor="location">
                                        {selectedValues.division ? (
                                            <p>
                                                {selectedValues.division
                                                    ? selectedValues.division
                                                          .label
                                                    : ""}
                                                {selectedValues.district
                                                    ? ` > ${selectedValues.district.label}`
                                                    : ""}
                                                {selectedValues.upazilla
                                                    ? ` > <>
                          ${selectedValues.upazilla.label}
                         
                          </>`
                                                    : ""}
                                            </p>
                                        ) : (
                                            "Select Location"
                                        )}
                                    </label>
                                    <Select
                                        id="location"
                                        className="bg-light"
                                        options={loading ? [] : options}
                                        value={selectedValues[step]}
                                        onChange={handleChange}
                                        placeholder={`Select ${
                                            step.charAt(0).toUpperCase() +
                                            step.slice(1)
                                        }`}
                                        isClearable
                                        isSearchable={false}
                                        menuIsOpen={true}
                                        components={{
                                            DropdownIndicator,
                                            NoOptionsMessage,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>

                <div className="product-free-delivery-area">
                    <div className="product-delivery-top-title d-flex align-items-center justify-content-between">
                        <h2>delivery charge</h2>
                        <div className="product-delivery-top-img">
                            <Image
                                className="img-fluid"
                                src="/images/delivery.svg"
                                alt="delivery image"
                                fill={true}
                            />
                        </div>
                    </div>
                    <div className="product-free-delivery-top d-flex justify-content-between flex-column">
                        <div className="product-free-delivery-info d-flex align-items-center">
                            <div className="product-free-delivery-info-img sidebar-common-img-size">
                                <Image
                                    className="img-fluid"
                                    src="/images/free-delivery.svg"
                                    fill={true}
                                    alt="free-delivery"
                                />
                            </div>
                            <h5>Delivery</h5>
                            {/* <p>12 Apr - 19 Apr</p> */}
                        </div>
                        <div className="product-free-delivery-info ">
                            <h6 className="custom-text-link">
                                {shippingAddress &&
                                shippingAddress.split(",")[0] === "Dhaka"
                                    ? productInfo?.inside_dhaka === "0.00"
                                        ? "Free"
                                        : productInfo?.inside_dhaka
                                    : productInfo?.outside_dhaka === "0.00"
                                    ? "130"
                                    : productInfo?.outside_dhaka}
                            </h6>
                        </div>
                    </div>
                    <div className="product-free-delivery-end-time">
                        {/* <p>12 - 19 day(s)</p>
                        <div className="product-free-delivery-textarea">
                            <textarea className="form-control" value="Enjoy free shipping promotion with minimum spend of ৳ 499 from Buy More Save More." />
                        </div> */}
                    </div>
                </div>
                <div className="product-details-service-area">
                    <div className="product-delivery-top-title d-flex align-items-center justify-content-between">
                        <h2>Service</h2>
                        <div className="product-delivery-top-img">
                            <Image
                                className="img-fluid"
                                src="/images/delivery.svg"
                                alt="delivery image"
                                fill={true}
                            />
                        </div>
                    </div>
                    <div className="product-free-delivery-two-col-holder">
                        <div className="product-free-delivery-two-col d-flex align-items-center">
                            <div className="product-free-delivery-two-col-img sidebar-common-img-size">
                                <Image
                                    className="img-fluid"
                                    src="/images/cash-on-delivery.svg"
                                    fill={true}
                                    alt="cash-on-delivery"
                                />
                            </div>
                            <h5>Cash on Delivery </h5>
                        </div>
                        <div className="product-free-delivery-status">
                            <h5>
                                {productInfo?.cash_on_delivery == "on"
                                    ? "Available"
                                    : "Unavailable"}
                            </h5>
                        </div>
                    </div>

                    <div className="product-details-service-info">
                        <div className="product-free-delivery-two-col d-flex align-items-center">
                            <div className="product-free-delivery-two-col-img sidebar-common-img-size">
                                <Image
                                    className="img-fluid"
                                    src="/images/return.svg"
                                    alt="return image"
                                    fill={true}
                                />
                            </div>
                            <h5>
                                {productInfo?.return_policy !== null
                                    ? productInfo?.return_policy
                                    : "Return Policy Unavailable"}
                            </h5>
                        </div>
                        <p>Change of mind is not applicable</p>
                        <div className="product-free-delivery-two-col d-flex align-items-center">
                            <div className="product-free-delivery-two-col-img sidebar-common-img-size">
                                <Image
                                    className="img-fluid"
                                    src="/images/warrant.svg"
                                    alt="warrant image"
                                    fill={true}
                                />
                            </div>
                            <h5
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal50"
                                data-bs-whatever="@getbootstrap"
                            >
                                Warranty
                            </h5>
                            <div
                                className="modal fade"
                                id="exampleModal50"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1
                                                className="modal-title fs-5"
                                                id="exampleModalLabel"
                                            >
                                                Product Warranty
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="message-text"
                                                        className="col-form-label"
                                                    >
                                                        {productInfo?.warranty !==
                                                        null
                                                            ? productInfo?.warranty
                                                            : "No Warranty Available"}
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                data-bs-dismiss="modal"
                                                className="bg-primary-color text-light py-2 px-2 border-0 rounded-2"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-details-delivery-bg mt-3">
                <div className="product-details-sold-area bg-white">
                    <div className="product-details-sold-top d-flex align-items-center justify-content-between">
                        <div className="product-details-sold-item">
                            <h5>Sold By</h5>{" "}
                        </div>
                    </div>
                    <p>Imran Fashion House</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDeliveryDetail;
