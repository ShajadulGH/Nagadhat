import Link from "next/link";
import Image from "next/image";
import CategorySubMenu from "./CategorySubMenu";
import { NagadhatPublicUrl } from "../utils";

const CategoryMainMenuList = ({ menuList, isMobile, setCategoryHoverMenu }) => {
    const catImage = `${NagadhatPublicUrl}/${menuList.logo}`;
    const categorySubMenuItem = menuList && menuList?.child_categories;

    return (
        <li className="menu-link">
            <Link
                href={isMobile && categorySubMenuItem?.length > 0 ? "#" : ` /category/${menuList.slug}`}
                className="link-item d-flex align-items-center justify-content-between"
                onClick={()=> isMobile && categorySubMenuItem?.length === 0 && setCategoryHoverMenu(false) }
            >
                <p className="d-flex align-items-center">
                    <span>
                        <Image
                            width={23}
                            height={20}
                            src={catImage}
                            alt={menuList.title ? menuList.title : ""}
                        />
                    </span>
                    {menuList.title ? menuList.title : ""}
                </p>
                {categorySubMenuItem && categorySubMenuItem.length > 0 && (
                    <small>
                        <Image
                            width={32}
                            height={32}
                            src="/images/menu-arrow.svg"
                            alt="arrow icon"
                        />
                    </small>
                )}
            </Link>
            {categorySubMenuItem && categorySubMenuItem.length > 0 && (
                <ul className="sub-category-menu shadow">
                    {categorySubMenuItem.map((subMenuItem) => (
                        <CategorySubMenu
                            key={subMenuItem.id}
                            subMenuItem={subMenuItem}
                            setCategoryHoverMenu={setCategoryHoverMenu}
                            isMobile={isMobile}
                        />
                    ))}
                </ul>
            )
            // setCategoryHoverMenu(false)
            }
        </li>
        // )
    );
};

export default CategoryMainMenuList;
