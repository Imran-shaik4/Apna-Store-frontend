// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     stores: [],
//     orders: [],
//     selectedStore: null, // Add this to hold a single store
//     selectedStoreId: null, // Add this to hold a single store
//     status: 'idle',
//     error: null,
//     totalPages: 0,
//     currentPage: 1,
//     searchedStores: [],
//     selectedOrder: null
// };

// // // Thunk for updating order
// // export const updateOrder = createAsyncThunk(
// //     'updateorder',
// //     async ({ orderId,storeId,data}, thunkAPI) => {
// //         const token = thunkAPI.getState().user.token;
// //         try {
// //             const response = await axios.put(`localhost:5000/api/orders/${orderId}?storeId=${storeId}`,data, {
// //                 headers: {
// //                     'x-auth-token': token
// //                 }
// //             });
// //             return response.data;
// //         } catch (error) {
// //             if (error.response && error.response.data) {
// //                 return thunkAPI.rejectWithValue(error.response.data);
// //             } else {
// //                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
// //             }
// //         }
// //     }
// // );
// export const updateOrder = createAsyncThunk(
//     'updateorder',
//     async ({ orderId, storeId, data }, thunkAPI) => {
//         const token = thunkAPI.getState().user.token;
//         try {
//             // Construct the correct URL
//             const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/store/${storeId}`, data, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );


// // Thunk for getting stores with pagination
// export const getStoresWithPagination = createAsyncThunk(
//     'stores/withPages',
//     async ({ page = 1, limit = 5 }, thunkAPI) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/stores?page=${page}&limit=${limit}`);
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for getting a store by ID
// export const getStoreById = createAsyncThunk(
//     'stores/byId',
//     async (id, thunkAPI) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/stores/${id}`);
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for searching by name
// export const searchByName = createAsyncThunk(
//     'stores/searchByName',
//     async (name, thunkAPI) => {
//         try {
//             // Use encodeURIComponent to safely encode the name parameter
//             const response = await axios.get(`http://localhost:5000/api/stores/search/name?name=${encodeURIComponent(name)}`);
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for searching by city
// export const searchByCity = createAsyncThunk(
//     'stores/searchBycity',
//     async (city, thunkAPI) => {
//         try {
//             // Use encodeURIComponent to safely encode the name parameter
//             const response = await axios.get(`http://localhost:5000/api/stores/search/city?city=${encodeURIComponent(city)}`);
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for getting all orders of the store
// export const getAllOrdersOfStore = createAsyncThunk(
//     'orders/storeId',
//     async (id, thunkAPI) => {
//         const token = thunkAPI.getState().user.token;
//         try {
//             const response = await axios.get(`http://localhost:5000/api/orders/store/${id}`, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for getting todays orders
// export const getTodaysOrders = createAsyncThunk(
//     'orders/today',
//     async (id, thunkAPI) => {
//         const token = thunkAPI.getState().user.token;
//         try {
//             const response = await axios.get(`http://localhost:5000/api/orders/store/${id}/today`, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for getting todays completed orders
// export const getTodaysCompletedOrders = createAsyncThunk(
//     'orders/today/completed',
//     async (id, thunkAPI) => {
//         const token = thunkAPI.getState().user.token;
//         try {
//             const response = await axios.get(`http://localhost:5000/api/orders/store/${id}/today/completed`, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

// // Thunk for getting todays uncompleted orders
// export const getTodaysUnCompletedOrders = createAsyncThunk(
//     'orders/today/uncompleted',
//     async (id, thunkAPI) => {
//         const token = thunkAPI.getState().user.token;
//         try {
//             const response = await axios.get(`http://localhost:5000/api/orders/store/${id}/today/uncompleted`, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return thunkAPI.rejectWithValue(error.response.data);
//             } else {
//                 return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
//             }
//         }
//     }
// );

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




// const storeSlice = createSlice({
//     name: 'store',
//     initialState,
//     reducers: {
//         setSelectedStoreId: (state, action) => {
//             state.selectedStoreId = action.payload;
//         },
//         setSelectedStore: (state, action) => {
//             state.selectedStore = action.payload;
//         },
//         clearSearchedStores: (state, action) => {
//             state.searchedStores = [];
//         },
//         storeChangeToIdle: (state, action) => {
//             state.status = 'idle';
//         },
//         setSelectedOrder: (state, action) => {
//             state.selectedOrder = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getStoresWithPagination.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getStoresWithPagination.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.stores = action.payload.stores;
//                 state.totalPages = action.payload.totalPages;
//                 state.currentPage = action.payload.currentPage;
//             })
//             .addCase(getStoresWithPagination.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch stores';
//             })
//             .addCase(getStoreById.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getStoreById.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.selectedStore = action.payload; // Set the selected store
//             })
//             .addCase(getStoreById.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch store';
//             })
//             .addCase(searchByName.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(searchByName.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.searchedStores = [...state.searchedStores, ...action.payload]; // Append the search results to the existing stores
//             })
//             .addCase(searchByName.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch stores';
//             })
//             .addCase(searchByCity.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(searchByCity.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.searchedStores = action.payload; // Set the search  stores
//             })
//             .addCase(searchByCity.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch stores';
//             })
//             .addCase(getAllOrdersOfStore.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getAllOrdersOfStore.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload; // Set the orders of the store
//             })
//             .addCase(getAllOrdersOfStore.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch orders';
//             })
//             .addCase(getTodaysOrders.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getTodaysOrders.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload; // Set the orders of the store
//             })
//             .addCase(getTodaysOrders.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch orders';
//             })
//             .addCase(getTodaysCompletedOrders.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getTodaysCompletedOrders.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload; // Set the orders of the store
//             })
//             .addCase(getTodaysCompletedOrders.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch orders';
//             })
//             .addCase(getTodaysUnCompletedOrders.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getTodaysUnCompletedOrders.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload; // Set the orders of the store
//             })
//             .addCase(getTodaysUnCompletedOrders.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch orders';
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
//             .addCase(updateOrder.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(updateOrder.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.selectedOrder = action.payload; // Add the fetched stores to the state
//             })
//             .addCase(updateOrder.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload.msg || 'Failed to fetch stores';
//             });
//     },
// });
// export const { setSelectedStoreId, setSelectedOrder, setSelectedStore, clearSearchedStores, storeChangeToIdle } = storeSlice.actions;
// export default storeSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL
const BASE_URL = 'https://apna-store-backend.onrender.com/api'; // Replace this with your actual production URL

const initialState = {
    stores: [],
    orders: [],
    selectedStore: null, // Add this to hold a single store
    selectedStoreId: null, // Add this to hold a single store
    status: 'idle',
    error: null,
    totalPages: 0,
    currentPage: 1,
    searchedStores: [],
    selectedOrder: null
};

// Thunk for updating order
export const updateOrder = createAsyncThunk(
    'updateorder',
    async ({ orderId, storeId, data }, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        try {
            // Construct the correct URL
            const response = await axios.put(`${BASE_URL}/orders/${orderId}/store/${storeId}`, data, {
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
    }
);

// Thunk for getting stores with pagination
export const getStoresWithPagination = createAsyncThunk(
    'stores/withPages',
    async ({ page = 1, limit = 5 }, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/stores?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
            }
        }
    }
);

// Thunk for getting a store by ID
export const getStoreById = createAsyncThunk(
    'stores/byId',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/stores/${id}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
            }
        }
    }
);

// Thunk for searching by name
export const searchByName = createAsyncThunk(
    'stores/searchByName',
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/stores/search/name?name=${encodeURIComponent(name)}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
            }
        }
    }
);

// Thunk for searching by city
export const searchByCity = createAsyncThunk(
    'stores/searchBycity',
    async (city, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/stores/search/city?city=${encodeURIComponent(city)}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ msg: 'Network error. Please try again later.' });
            }
        }
    }
);

// Thunk for getting all orders of the store
export const getAllOrdersOfStore = createAsyncThunk(
    'orders/storeId',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        try {
            const response = await axios.get(`${BASE_URL}/orders/store/${id}`, {
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
    }
);

// Thunk for getting today's orders
export const getTodaysOrders = createAsyncThunk(
    'orders/today',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        try {
            const response = await axios.get(`${BASE_URL}/orders/store/${id}/today`, {
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
    }
);

// Thunk for getting today's completed orders
export const getTodaysCompletedOrders = createAsyncThunk(
    'orders/today/completed',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        try {
            const response = await axios.get(`${BASE_URL}/orders/store/${id}/today/completed`, {
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
    }
);

// Thunk for getting today's uncompleted orders
export const getTodaysUnCompletedOrders = createAsyncThunk(
    'orders/today/uncompleted',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        try {
            const response = await axios.get(`${BASE_URL}/orders/store/${id}/today/uncompleted`, {
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
    }
);

// Async thunk for all stores of the user
export const getAllStoresOfUser = createAsyncThunk('users/getStore', async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;

    try {
        const response = await axios.get(`${BASE_URL}/stores/user`, {
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

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setSelectedStoreId: (state, action) => {
            state.selectedStoreId = action.payload;
        },
        setSelectedStore: (state, action) => {
            state.selectedStore = action.payload;
        },
        clearSearchedStores: (state, action) => {
            state.searchedStores = [];
        },
        storeChangeToIdle: (state, action) => {
            state.status = 'idle';
        },
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStoresWithPagination.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStoresWithPagination.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores = action.payload.stores;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getStoresWithPagination.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            })
            .addCase(getStoreById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStoreById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedStore = action.payload; // Set the selected store
            })
            .addCase(getStoreById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch store';
            })
            .addCase(searchByName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchedStores = [...state.searchedStores, ...action.payload]; // Append the search results to the existing stores
            })
            .addCase(searchByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            })
            .addCase(searchByCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchByCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchedStores = action.payload; // Set the search  stores
            })
            .addCase(searchByCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            })
            .addCase(getAllOrdersOfStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllOrdersOfStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Set the orders of the store
            })
            .addCase(getAllOrdersOfStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch orders';
            })
            .addCase(getTodaysOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTodaysOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Set the orders of the store
            })
            .addCase(getTodaysOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch orders';
            })
            .addCase(getTodaysCompletedOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTodaysCompletedOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Set the orders of the store
            })
            .addCase(getTodaysCompletedOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch orders';
            })
            .addCase(getTodaysUnCompletedOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTodaysUnCompletedOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Set the orders of the store
            })
            .addCase(getTodaysUnCompletedOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch orders';
            })
            .addCase(getAllStoresOfUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllStoresOfUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores = action.payload; // Add the fetched stores to the state
            })
            .addCase(getAllStoresOfUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            })
            .addCase(updateOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedOrder = action.payload; // Add the fetched stores to the state
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.msg || 'Failed to fetch stores';
            });
    },
});

export const { setSelectedStoreId, setSelectedOrder, setSelectedStore, clearSearchedStores, storeChangeToIdle } = storeSlice.actions;
export default storeSlice.reducer;

