import CategoryMainMenuList from "./CategoryMainMenuList";
const iconList = [
    "/images/dress.png",
    "/images/giftbox.png",
    "/images/duffle-bag.png",
    "/images/cleaning-tools.png",
    "/images/flour.png",
    "/images/diet.png",
    "/images/baby-boy.png",
    "/images/pen.png",
    "/images/rice-cooker.png",
    "/images/cosmetology.png",
];
const CategoryMainMenu = ({ categoryMenu }) => {
    // const menuItems = categoryMenu;
    const menuItems = categoryMenu.map((item, index) => ({
        ...item,
        icon: iconList[index % iconList.length], // loop icons if not enough
    }));
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
