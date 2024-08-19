import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrdersOfUser } from '../features/userSlice';

const UserOrders = () => {
    const dispatch = useDispatch();
    const { orders = [], status, error } = useSelector((state) => state.user);

    const handleFetchOrders = () => {
        dispatch(getAllOrdersOfUser());
    };

    return (
        <div>
            <h1>User Orders</h1>
            <button onClick={handleFetchOrders}>Fetch Orders</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <div>
                    {orders.length > 0 ? (
                        <ul>
                            {console.log(orders)}

                            {orders.map((order) => (
                                <li key={order.id}>
                                    <p>Order ID: {order._id}</p>
                                    <p>Total Price: {order.totalAmount}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Items:</p>
                                    <ul>
                                        {order.products.map((item) => (
                                            <li key={item.productId}>
                                                <p>Product: {item.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: {item.price}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserOrders;
