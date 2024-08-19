import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreById } from '../features/storeSlice';

const StoreDetail = () => {
    const dispatch = useDispatch();
    const { selectedStore, status, error } = useSelector((state) => state.store);
    const [storeId, setStoreId] = useState('');

    const handleFetchStoreById = () => {
        if (storeId) {
            dispatch(getStoreById(storeId));
        }
    };

    useEffect(() => {
        if (storeId) {
            dispatch(getStoreById(storeId));
        }
    }, [dispatch, storeId]);

    return (
        <div>
            <h2>Fetch Store by ID</h2>
            <input
                type="text"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                placeholder="Enter Store ID"
            />
            <button onClick={handleFetchStoreById}>Fetch Store</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {selectedStore ? (
                <div>
                    <h1>{selectedStore.name}</h1>
                    <p>Owner: {selectedStore.owner.name}</p>
                    <p>Address:</p>
                    <p>{selectedStore.address.street}, {selectedStore.address.city}, {selectedStore.address.state}</p>
                </div>
            ) : (
                <p>No store found.</p>
            )}
        </div>
    );
};

export default StoreDetail;
