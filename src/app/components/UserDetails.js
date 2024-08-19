import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTheProfile, updateProfile } from '../features/userSlice';

function UserDetails() {
    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.user);
    const [editDetails, setEditDetails] = useState({
        name: '',
        address: {
            city: '',
            state: ''
        },
        phone: ''
    });

    const handleFetchProfile = () => {
        dispatch(getTheProfile());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'city' || name === 'state') {
            setEditDetails((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setEditDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdateProfile = () => {
        dispatch(updateProfile(editDetails));
    };

    return (
        <div>
            <h1>User Details</h1>
            <button onClick={handleFetchProfile}>Get User Details</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {user && status === 'succeeded' && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Address: {user.address.city}, {user.address.state}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            )}
            <h2>Update Profile</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={editDetails.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={editDetails.address.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                value={editDetails.address.state}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={editDetails.phone}
                onChange={handleInputChange}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
    );
}

export default UserDetails;
