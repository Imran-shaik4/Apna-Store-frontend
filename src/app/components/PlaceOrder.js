import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../features/userSlice'; // Adjust the path as needed

const PlaceOrder = () => {
    const [storeId, setStoreId] = useState('');
    const [products, setProducts] = useState([{ name: '', quantity: '' }]);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, { name: '', quantity: '' }]);
    };

    const handlePlaceOrder = () => {
        if (storeId.trim() !== '' && products.length > 0) {
            const orderDetails = {
                storeId,
                products: products.map(product => ({
                    name: product.name,
                    quantity: parseInt(product.quantity, 10)
                }))
            };
            dispatch(placeOrder(orderDetails));
        }
    };

    return (
        <div>
            <h2>Place Order</h2>
            <input
                type="text"
                placeholder="Enter store ID"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
            />
            {products.map((product, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Product name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    />
                </div>
            ))}
            <button onClick={addProduct}>Add Product</button>
            <button onClick={handlePlaceOrder} disabled={status === 'loading'}>
                {status === 'loading' ? 'Placing Order...' : 'Place Order'}
            </button>
            {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PlaceOrder;
