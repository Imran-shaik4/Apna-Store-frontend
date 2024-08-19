import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/userSlice';

function Register() {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        address: {
            city: '',
            state: ''
        },
        phone: ''
    });
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'city' || name === 'state') {
            setUserDetails((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setUserDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRegister = () => {
        dispatch(register(userDetails));
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={userDetails.name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={userDetails.role}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={userDetails.address.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                value={userDetails.address.state}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={userDetails.phone}
                onChange={handleInputChange}
            />
            <button onClick={handleRegister}>Register</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
        </div>
    );
}

export default Register;
