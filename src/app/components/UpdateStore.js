import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStore } from '../features/userSlice'; // Adjust the import path according to your project structure

const UpdateStore = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const [storeId, setStoreId] = useState('');
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name,
            address: {
                street,
                city,
                state,
            },
        };
        dispatch(updateStore({ storeId, newData }));
    };

    return (
        <div>
            <h2>Update Store</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="storeId">Store ID:</label>
                    <input
                        type="text"
                        id="storeId"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="street">Street:</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Store</button>
            </form>
        </div>
    );
};

export default UpdateStore;
