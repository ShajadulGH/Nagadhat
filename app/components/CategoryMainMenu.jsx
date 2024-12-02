import CategoryMainMenuList from "./CategoryMainMenuList";

const CategoryMainMenu = ({ categoryMenu }) => {
    const menuItems = categoryMenu;
    return (
        <>
            <ul className="category-menu-area shadow-sm">
                {Array.isArray(menuItems) &&
                    menuItems.map((menuItem) => (
                        <CategoryMainMenuList
                            key={menuItem.id}
                            menuList={menuItem}
                        />
                    ))}
            </ul>
        </>
    );
};

export default CategoryMainMenu;
