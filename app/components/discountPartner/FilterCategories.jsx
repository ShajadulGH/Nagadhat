"use client";
const FilterCategories = ({
    selectedCategory,
    setSelectedCategory,
    serviceCategory,
}) => {
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <div className="d-flex align-items-center pb-4">
                <label
                    htmlFor="category"
                    className="rounded-2 px-4 py-2 bg-success text-white border-2 border-secondary btn-outline-light fs-6"
                >
                    Filter
                </label>
                <select
                    className="form-select py-2 border-1 btn-outline-light focus-ring focus-ring-light"
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="All Category">All Category</option>
                    {serviceCategory && serviceCategory.length > 0 ? (
                        serviceCategory.map((item) => (
                            <option key={item?.id} value={item?.id}>
                                {item?.title}
                            </option>
                        ))
                    ) : (
                        <option>Category not Available</option>
                    )}
                </select>
            </div>
        </div>
    );
};

export default FilterCategories;
