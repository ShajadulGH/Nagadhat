import SubCategoryListItems from "./SubCategoryListItems";

const SubCategoryList = ({ subCategoryData }) => {
    return (
        <div
            className={`product-sub-category-area sub-category-pb40   ${
                subCategoryData?.length >= 10 ? "sub-category-fixed-height" : ""
            }`}
           
        >
            <ul>
                {Array.isArray(subCategoryData) &&
                subCategoryData.length > 0 ? (
                    subCategoryData.map((categoryItem) => (
                        <li key={categoryItem.id}>
                            <SubCategoryListItems categoryItem={categoryItem} />
                        </li>
                    ))
                ) : (
                    <li>No subcategories found.</li>
                )}
            </ul>
        </div>
    );
};

export default SubCategoryList;
