import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStore } from '../features/userSlice';

const CreateStore = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.store);

    const [storeDetails, setStoreDetails] = useState({
        name: '',
        address: {
            street: '',
            city: '',
            state: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setStoreDetails((prevDetails) => ({
                ...prevDetails,
                address: {
                    ...prevDetails.address,
                    [addressField]: value
                }
            }));
        } else {
            setStoreDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createStore(storeDetails));
    };

    return (
        <div>
            <h1>Create Store</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Store Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={storeDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Street Address:</label>
                    <input
                        type="text"
                        name="address.street"
                        value={storeDetails.address.street}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="address.city"
                        value={storeDetails.address.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="address.state"
                        value={storeDetails.address.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Store</button>
            </form>
            {status === 'loading' && <p>Creating store...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && <p>Store created successfully!</p>}
        </div>
    );
};

export default CreateStore;
