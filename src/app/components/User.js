import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/userSlice';

function User() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const token = useSelector((state) => state.user.token);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        dispatch(login(credentials));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <h1>User Authentication</h1>
            {token ? (
                <div>
                    <p>Logged in with token: {token}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleLogin}>Login</button>
                    {status === 'loading' && <p>Loading...</p>}
                    {status === 'failed' && <p>Error: {error}</p>}
                </div>
            )}
        </div>
    );
}

export default User;
