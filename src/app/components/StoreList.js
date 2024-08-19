import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoresWithPagination } from '../features/storeSlice';

const StoresList = () => {
    const dispatch = useDispatch();
    const { stores, status, error, totalPages, currentPage } = useSelector((state) => state.store);

    useEffect(() => {
        dispatch(getStoresWithPagination({ page: currentPage, limit: 5 }));
    }, [dispatch, currentPage]);

    const handlePageChange = (newPage) => {
        dispatch(getStoresWithPagination({ page: newPage, limit: 5 }));
    };

    return (
        <div>
            <h1>Stores List</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <div>
                    <ul>
                        {stores.map((store) => (
                            <li key={store._id}>
                                <p>Store Name: {store.name}</p>
                                <p>Owner: {store.owner.name}</p>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoresList;
