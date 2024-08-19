import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStore } from '../features/userSlice'; // Adjust the path as needed

const DeleteStore = () => {
    const [storeId, setStoreId] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const handleDelete = () => {
        if (storeId.trim() !== '') {
            dispatch(deleteStore(storeId));
        }
    };

    return (
        <div>
            <h2>Delete Store</h2>
            <input
                type="text"
                placeholder="Enter store ID"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
            />
            <button onClick={handleDelete} disabled={status === 'loading'}>
                {status === 'loading' ? 'Deleting...' : 'Delete Store'}
            </button>
            {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeleteStore;
