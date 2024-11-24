"use client";
import { useEffect, useState } from "react";
import { getCategoryMenu } from "../services/getCategoryMenu";
import CategoryMainMenu from "./CategoryMainMenu";
// import { filterBySliderMenuView } from "../utils";

function CategoryHoverMenu({ isActive, setCategoryHoverMenu, isMobile }) {
    const [categoryMenuOption, setCategoryMenuOption] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getCategoryMenu();
            const filteredList = data;
            setCategoryMenuOption(filteredList);
        }
        fetchData();
    }, []);

    return (
        <div className={`container ${isMobile? "bg-light-subtle":""}`}>
            <div
                className={`observer-hover-menu  ${isActive ? "active" : ""} ${isMobile ? "bottom-0 bg-opacity-25":""}`}
                onMouseLeave={() => setCategoryHoverMenu(false)}
            >
                {categoryMenuOption && (
                    <CategoryMainMenu categoryMenu={categoryMenuOption} isMobile={isMobile} setCategoryHoverMenu={setCategoryHoverMenu} />
                )}
            </div>
        </div>
    );
}

export default CategoryHoverMenu;
