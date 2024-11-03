"use client";
import { useEffect, useState } from "react";
import { getDistrictByDivisionId } from "../services/getDistrict";
import { getDeliveryLocations } from "../services/getDeliveryLocations";

const DistrictList = ({ onDistrictChange, divisionId }) => {
    const [districts, setDistricts] = useState([]);
    const [divisionName, setDivisionName] = useState('');
    useEffect(() => {
        async function fetchDistrictData() {
            try {
                const districtData = await getDistrictByDivisionId(divisionId);
                setDistricts(districtData?.districts);
                setDivisionName(districtData?.division_name);
            } catch (error) {
                console.error("Cannot fetch division data.");
                console.info(error);
            }
        }

        fetchDistrictData();
    }, [divisionId]);

    const handleDistrictChange = async (event) => {
        const selectedDistrictId = event.target.value;
        const selectedDistrict = districts.find(
            (district) => district.id == selectedDistrictId
        );
        if (selectedDistrict) {
            localStorage.setItem("outletId", selectedDistrict?.outlet_id || 3);
            localStorage.setItem("districtId", selectedDistrict.id || 47);
            localStorage.setItem("location", `${divisionName}, ${selectedDistrict.name}`);
        }
        onDistrictChange(event);
    };

    return (
        <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleDistrictChange}
        >
            <option value="">Select District</option>
            {districts &&
                districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
        </select>
    );
};

export default DistrictList;
