import ViewAllCategoryItems from "./ViewAllCategoryItems";

const ViewAllCategories = ({ viewCategoryData,isCategory }) => {
    return (
        <div className="row nh-categories-row view-all-product-area">
            <div className="col-md-12">
                <div className="nh-categories-holder-s nh-view-all-product">
                    {viewCategoryData?.map((categoryItem) => {
                        return (
                            <ViewAllCategoryItems
                                key={categoryItem.id}
                                items={categoryItem}
                                isCategory={isCategory}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ViewAllCategories;
