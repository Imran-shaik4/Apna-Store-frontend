import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchByName, searchByCity } from '../features/storeSlice';

const SearchStores = () => {
    const dispatch = useDispatch();
    const { stores, status, error } = useSelector((state) => state.store);

    const [searchType, setSearchType] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchType === 'name') {
            dispatch(searchByName(searchTerm));
        } else {
            dispatch(searchByCity(searchTerm));
        }
    };

    return (
        <div>
            <h1>Search Stores</h1>
            <div>
                <label>
                    Search by:
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="city">City</option>
                    </select>
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Enter store ${searchType}`}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <div>
                    {stores.length > 0 ? (
                        <ul>
                            {stores.map((store) => (
                                <li key={store._id}>
                                    <p>Store Name: {store.name}</p>
                                    <p>Owner: {store.owner.name}</p>
                                    <p>Address: {store.address.street}, {store.address.city}, {store.address.state}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No stores found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchStores;
