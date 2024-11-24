
import Image from "next/image";
import Link from "next/link";

const CategorySubMenu = ({ subMenuItem, setCategoryHoverMenu, isMobile }) => {
    // const subsubMenuItem = subMenuItem?.child_categories;
    return (
        <li className="sub-category-menu-li-list">
            <Link
                href={`/category/${subMenuItem.slug}`}
                className=" d-flex align-items-center justify-content-between"
                onClick={() => isMobile && setCategoryHoverMenu(false)}
            >
                {subMenuItem.title ? subMenuItem.title : ""}
                {/* {subsubMenuItem &&
                    subsubMenuItem?.length > 0 (
                            <small>
                                <Image
                                    width={28}
                                    height={28}
                                    src="/images/menu-arrow.svg"
                                    alt="arrow icon"
                                />
                            </small>
                )} */}
            </Link>
            {/* {subsubMenuItem && subsubMenuItem.length > 0 && (
                <ul className="inner-sub-category-menu">
                    {subsubMenuItem.map((item) => (
                        <li key={item.id}>
                            <Link href="#">{item.title}</Link>
                        </li>
                    ))}
                </ul>
            )} */}
        </li>
    );
}

export default CategorySubMenu