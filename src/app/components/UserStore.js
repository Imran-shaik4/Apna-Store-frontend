import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStoresOfUser } from '../features/userSlice';

const UserStores = () => {
    const dispatch = useDispatch();
    const { stores, status, error } = useSelector((state) => state.user);

    const handleFetchStores = () => {
        dispatch(getAllStoresOfUser());
    };

    return (
        <div>
            <button onClick={handleFetchStores}>Get My Stores</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {stores.map((store) => (
                        <li key={store._id}>
                            <p>Store Name: {store.name}</p>
                            <p>Owner: {store.owner.name}</p>
                            <p>Address: {store.address.street}, {store.address.city}, {store.address.state}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserStores;
