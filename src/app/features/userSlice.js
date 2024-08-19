// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // Initial state
// const initialState = {
//     token: localStorage.getItem('token') || null,
//     userInfo: null,
//     status: 'idle',
//     error: null,
//     orders: [],
//     stores: [],
// };
// const URL ="https://apna-store-backend.onrender.com"
// // Async thunk for logging in
// export const login = createAsyncThunk('users/login', async (credentials, thunkAPI) => {
//     try {
//         const response = await axios.post(`${URL}/api/users/login`, credentials);
//         return response.data;
//     } catch (error) {
//         // Log the error to understand its structure
//         // console.error('Login error:', error);

//         // Check if error.response is defined and has data
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             // Handle network error
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk for registering
// export const register = createAsyncThunk('users/register', async (userDetails, thunkAPI) => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/users/register', userDetails);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });
// // Async thunk for get the profile
// export const getTheProfile = createAsyncThunk('users/profile', async (_, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;
//     try {
//         const response = await axios.get('http://localhost:5000/api/users/profile', {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk for update the profile
// export const updateProfile = createAsyncThunk('users/updateProfile', async (userDetails, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;
//     try {
//         const response = await axios.put("http://localhost:5000/api/users/profile", userDetails, {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk for get all orders of the user
// export const getAllOrdersOfUser = createAsyncThunk('users/allorders', async (_, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;
//     try {
//         const response = await axios.get('http://localhost:5000/api/users/orders', {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk creating store
// export const createStore = createAsyncThunk('users/storecreate', async (storeDetails, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;

//     try {
//         const response = await axios.post('http://localhost:5000/api/stores', storeDetails, {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         // Log the error to understand its structure
//         // console.error('Login error:', error);

//         // Check if error.response is defined and has data
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             // Handle network error
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk all stores of the user
// export const getAllStoresOfUser = createAsyncThunk('users/getStore', async (_, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;

//     try {
//         const response = await axios.get('http://localhost:5000/api/stores/user', {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         // Log the error to understand its structure
//         // console.error('Login error:', error);

//         // Check if error.response is defined and has data
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             // Handle network error
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk for update store
// // export const updateStore = createAsyncThunk('users/updateStore', async ({storeId,newData}, thunkAPI) => {
// //     const token = thunkAPI.getState().user.token;

// //     try {
// //         const response = await axios.put(`http://localhost:5000/api/stores/${storeId}`,newData, {
// //             headers: {
// //                 'x-auth-token': token
// //             }
// //         });
// //         return response.data;
// //     } catch (error) {
// //         // Log the error to understand its structure
// //         // console.error('Login error:', error);

// //         // Check if error.response is defined and has data
// //         if (error.response && error.response.data) {
// //             return thunkAPI.rejectWithValue(error.response.data);
// //         } else {
// //             // Handle network error
// //             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
// //         }
// //     }
// // });

// // Async thunk for updating store
// export const updateStore = createAsyncThunk('users/updateStore', async ({ storeId, newData }, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;

//     try {
//         const response = await axios.put(`http://localhost:5000/api/stores/${encodeURIComponent(storeId)}`, newData, {
//             headers: {
//                 'x-auth-token': token,
//                 'Content-Type': 'application/json', // Ensure the content type is set correctly
//             },
//         });
//         return response.data;
//     } catch (error) {
//         // Check if error.response is defined and has data
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             // Handle network error
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // Async thunk for deleting a store
// export const deleteStore = createAsyncThunk('users/deleteStore', async (storeId, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;

//     try {
//         const response = await axios.delete(`http://localhost:5000/api/stores/${storeId}`, {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return { storeId, data: response.data };
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });

// // // Async thunk creating order
// // export const plaseOrder = createAsyncThunk('users/plaseOrder', async (orderDetails, thunkAPI) => {
// //     const token = thunkAPI.getState().user.token;

// //     try {
// //         const response = await axios.post('http://localhost:5000/api/orders', orderDetails, {
// //             headers: {
// //                 'x-auth-token': token
// //             }
// //         });
// //         return response.data;
// //     } catch (error) {
// //         // Log the error to understand its structure
// //         // console.error('Login error:', error);

// //         // Check if error.response is defined and has data
// //         if (error.response && error.response.data) {
// //             return thunkAPI.rejectWithValue(error.response.data);
// //         } else {
// //             // Handle network error
// //             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
// //         }
// //     }
// // });
// // Async thunk for placing an order
// export const placeOrder = createAsyncThunk('users/placeOrder', async (orderDetails, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;

//     try {
//         const response = await axios.post('http://localhost:5000/api/orders', orderDetails, {
//             headers: {
//                 'x-auth-token': token
//             }
//         });
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         } else {
//             return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//         }
//     }
// });


// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.token = null;
//             state.userInfo = null;
//             localStorage.removeItem('token');
//             state.status = 'idle';
//             state.orders = [];
//             state.stores = [];
//             state.error = null;
//         },
//         changeToIdle: (state, action) => {
//             state.status = 'idle';
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.token = action.payload.token;
//                 localStorage.setItem('token', action.payload.token);
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to login';
//             })
//             .addCase(register.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(register.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.token = action.payload.token;
//                 localStorage.setItem('token', action.payload.token);
//             })
//             .addCase(register.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to register';
//             })
//             .addCase(getTheProfile.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getTheProfile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload;
//             })
//             .addCase(getTheProfile.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch profile';
//             })
//             .addCase(updateProfile.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(updateProfile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = { ...state.user, ...action.payload }; // Update user details
//             })
//             .addCase(updateProfile.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to update profile';
//             })
//             .addCase(getAllOrdersOfUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload; // Add all orders
//             })
//             .addCase(getAllOrdersOfUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch orders';
//             })
//             .addCase(createStore.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(createStore.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.stores.push(action.payload); // Add the new store to the stores array
//             })
//             .addCase(createStore.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to create store';
//             })
//             .addCase(getAllStoresOfUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getAllStoresOfUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.stores = action.payload; // Add the fetched stores to the state
//             })
//             .addCase(getAllStoresOfUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch stores';
//             })
//             .addCase(updateStore.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(updateStore.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 const updatedStore = action.payload;
//                 const index = state.stores.findIndex(store => store._id === updatedStore._id);
//                 if (index !== -1) {
//                     state.stores[index] = updatedStore; // Update the store in the stores array
//                 }
//             })
//             .addCase(updateStore.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to update store';
//             })
//             .addCase(deleteStore.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(deleteStore.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.stores = state.stores.filter(store => store._id !== action.payload.storeId);
//             })
//             .addCase(deleteStore.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to delete store';
//             })
//             .addCase(placeOrder.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(placeOrder.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders.push(action.payload); // Add the new order to the orders array
//             })
//             .addCase(placeOrder.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to place order';
//             });
//     },
// });

// export const { logout, changeToIdle } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    token: localStorage.getItem('token') || null,
    userInfo: null,
    status: 'idle',
    error: null,
    orders: [],
    stores: [],
};

const URL = "https://apna-store-backend.onrender.com";

// Async thunk for logging in
export const login = createAsyncThunk('users/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${URL}/api/users/login`, credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for registering
export const register = createAsyncThunk('users/register', async (userDetails, thunkAPI) => {
    try {
        const response = await axios.post(`${URL}/api/users/register`, userDetails);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for getting the profile
export const getTheProfile = createAsyncThunk('users/profile', async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.get(`${URL}/api/users/profile`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for updating the profile
export const updateProfile = createAsyncThunk('users/updateProfile', async (userDetails, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.put(`${URL}/api/users/profile`, userDetails, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for getting all orders of the user
export const getAllOrdersOfUser = createAsyncThunk('users/allorders', async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.get(`${URL}/api/users/orders`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for creating a store
export const createStore = createAsyncThunk('users/storecreate', async (storeDetails, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.post(`${URL}/api/stores`, storeDetails, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for getting all stores of the user
export const getAllStoresOfUser = createAsyncThunk('users/getStore', async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.get(`${URL}/api/stores/user`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for updating a store
export const updateStore = createAsyncThunk('users/updateStore', async ({ storeId, newData }, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.put(`${URL}/api/stores/${encodeURIComponent(storeId)}`, newData, {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for deleting a store
export const deleteStore = createAsyncThunk('users/deleteStore', async (storeId, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.delete(`${URL}/api/stores/${storeId}`, {
            headers: {
                'x-auth-token': token
            }
        });
        return { storeId, data: response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

// Async thunk for placing an order
export const placeOrder = createAsyncThunk('users/placeOrder', async (orderDetails, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
        const response = await axios.post(`${URL}/api/orders`, orderDetails, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.userInfo = null;
            localStorage.removeItem('token');
            state.status = 'idle';
            state.orders = [];
            state.stores = [];
            state.error = null;
        },
        changeToIdle: (state, action) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to login';
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to register';
            })
            .addCase(getTheProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTheProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getTheProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch profile';
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to update profile';
            })
            .addCase(getAllOrdersOfUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(getAllOrdersOfUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch orders';
            })
            .addCase(createStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores.push(action.payload);
            })
            .addCase(createStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to create store';
            })
            .addCase(getAllStoresOfUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllStoresOfUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores = action.payload;
            })
            .addCase(getAllStoresOfUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            })
            .addCase(updateStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedStoreIndex = state.stores.findIndex(store => store._id === action.payload._id);
                if (updatedStoreIndex !== -1) {
                    state.stores[updatedStoreIndex] = action.payload;
                }
            })
            .addCase(updateStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to update store';
            })
            .addCase(deleteStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores = state.stores.filter(store => store._id !== action.payload.storeId);
            })
            .addCase(deleteStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to delete store';
            })
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to place order';
            });
    },
});

export const { logout, changeToIdle } = userSlice.actions;

export default userSlice.reducer;



