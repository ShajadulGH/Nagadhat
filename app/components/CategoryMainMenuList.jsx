import Link from "next/link";
import Image from "next/image";
import CategorySubMenu from "./CategorySubMenu";
import { NagadhatPublicUrl } from "../utils";
import { FaChevronRight } from "react-icons/fa";
const CategoryMainMenuList = ({ menuList }) => {
    const catImage = `${NagadhatPublicUrl}/${menuList.logo}`;
    const categorySubMenuItem = menuList && menuList?.child_categories;

    return (
        <li className="menu-link text-dark ">
            <Link
                href={`/category/${menuList.slug}`}
                className="link-item d-flex align-items-center justify-content-between"
            >
                <p className="d-flex align-items-center category-title ">
                    <span className="mb-1">
                        <Image
                            width={25}
                            height={25}
                            src={menuList.icon}
                            alt={menuList.title ? menuList.title : ""}
                        />
                    </span>
                    {menuList.title ? menuList.title : ""}
                </p>
                {categorySubMenuItem && categorySubMenuItem.length > 0 && (
                    <small>
                        {/* <Image
                            width={32}
                            height={32}
                            src="/images/menu-arrow.svg"
                            alt="arrow icon"
                        /> */}
                        <FaChevronRight size={16} />
                    </small>
                )}
            </Link>
            {categorySubMenuItem && categorySubMenuItem.length > 0 && (
                <ul className="sub-category-menu shadow-sm">
                    {categorySubMenuItem.map((subMenuItem) => (
                        <CategorySubMenu
                            key={subMenuItem.id}
                            subMenuItem={subMenuItem}
                        />
                    ))}
                </ul>
            )}
        </li>
        // )
    );
};

export default CategoryMainMenuList;
