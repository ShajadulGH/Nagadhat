'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from "./Pagination";

const CategoryPagination = ({ lastPage, currentPage }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page);
    };

    return (
        <Pagination 
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
        />
    );
};

export default CategoryPagination;
