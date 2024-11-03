import Link from "next/link";
import React from "react";

const Breadcrumb = ({ category }) => {
    const buildCategoryPath = (category) => {
        const path = [];
        let currentCategory = category;

        while (currentCategory) {
            path.unshift(
                <React.Fragment key={currentCategory.id}>
                    <li className="breadcrumb-item">
                        <Link href={`/category/${currentCategory.slug}`}>
                            {currentCategory.title}
                        </Link>
                    </li>
                </React.Fragment>
            );
            currentCategory = currentCategory.parent;
        }

        return path;
    };

    // Check if category is undefined or null
    if (!category) {
        return null;
    }

    return (
        <div className="row product-details-breadcrumb-area">
            <div className="col-md-12">
                <nav aria-label="breadcrumb" className="breadcrumb-content">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>

                        {buildCategoryPath(category[0])}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumb;
