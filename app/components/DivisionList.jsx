"use client"
import { useEffect, useState } from "react";
import { getDivision } from "../services/getDivision";

const DivisionList = ({ onDivisionChange }) => {
    const [divisions, setDivisions] = useState([]);

    useEffect(() => {
        async function fetchDivisionData() {
            try {
                const divisionData = await getDivision();
                setDivisions(divisionData);
            } catch (error) {
                console.error("Cannot fetch division data.");
                console.info(error);
            }
        }

        fetchDivisionData();
    }, []);
    return (
        <select
            className="form-select"
            aria-label="Default select example"
            onChange={onDivisionChange}
        >
            <option value="">Select Division</option>
            {divisions &&
                divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                        {division.name}
                    </option>
                ))}
        </select>
    );
};

export default DivisionList;
