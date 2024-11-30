"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";

const Pagination = ({ currentPage, lastPage }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    if (lastPage === 1) {
        return null;
    }

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page);
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        router.push(newUrl);
    };

    const createPageLinks = () => {
        let pages = [];

        if (lastPage <= 5) {
            // Show all pages if lastPage is 5 or less
            for (let i = 1; i <= lastPage; i++) {
                pages.push(
                    <li
                        key={i}
                        className={`page-item ${i === currentPage ? "active" : ""}`}
                    >
                        <p className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </p>
                    </li>
                );
            }
        } else {
            // Show first, last, and nearby pages with ellipsis
            if (currentPage > 2) {
                pages.push(
                    <li key={1} className="page-item">
                        <p className="page-link" onClick={() => handlePageChange(1)}>
                            1
                        </p>
                    </li>
                );
                if (currentPage > 3) {
                    pages.push(
                        <li key="left-ellipsis" className="page-item disabled opacity-100 ">
                            <span className="page-link bg-white border-0 px-1"><FaEllipsisH /></span>
                        </li>
                    );
                }
            }

            for (
                let i = Math.max(1, currentPage - 1);
                i <= Math.min(lastPage, currentPage + 1);
                i++
            ) {
                pages.push(
                    <li
                        key={i}
                        className={`page-item ${i === currentPage ? "active" : ""}`}
                    >
                        <p className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </p>
                    </li>
                );
            }

            if (currentPage < lastPage - 1) {
                if (currentPage < lastPage - 2) {
                    pages.push(
                        <li key="right-ellipsis" className="page-item disabled opacity-100 bg-white">
                            <span className="page-link bg-white border-0 px-1"><FaEllipsisH /></span>
                        </li>
                    );
                }
                pages.push(
                    <li key={lastPage} className="page-item">
                        <p className="page-link" onClick={() => handlePageChange(lastPage)}>
                            {lastPage}
                        </p>
                    </li>
                );
            }
        }

        return pages;
    };

    return (
        <>
            {
                lastPage > 1 ?
                    (<div className="product-category-pagination-col d-flex justify-content-center align-items-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination align-items-center">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <p
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">&#60;</span>
                                    </p>
                                </li>
                                {createPageLinks()}
                                <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                                    <p
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">&#62;</span>
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </div>)
                    :
                    ""
            }
        </>
    );
};

export default Pagination;
