import CategoryMainMenuList from "./CategoryMainMenuList";

const CategoryMainMenu = ({ categoryMenu, isMobile, setCategoryHoverMenu }) => {
    const menuItems = categoryMenu;
    return (
        <>
            <ul className="category-menu-area">
                {Array.isArray(menuItems) &&
                    menuItems.map((menuItem) => (
                        <CategoryMainMenuList
                            key={menuItem.id}
                            menuList={menuItem}
                            isMobile={isMobile}
                            setCategoryHoverMenu={setCategoryHoverMenu}
                        />
                    ))}
            </ul>
        </>
    );
};

export default CategoryMainMenu;
