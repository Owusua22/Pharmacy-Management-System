// client/src/features/customerSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCustomersAPI,
  fetchCustomerByNameAPI,
  addCustomerAPI,
  updateCustomerAPI,
  deleteCustomerAPI
} from '../api';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await fetchCustomersAPI();
  return response.data;
});

export const fetchCustomerByName = createAsyncThunk('customers/fetchCustomerByName', async (name) => {
  const response = await fetchCustomerByNameAPI(name);
  return response.data;
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (customer) => {
  const response = await addCustomerAPI(customer);
  return response.data;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, customer }) => {
  const response = await updateCustomerAPI(id, customer);
  return response.data;
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
  await deleteCustomerAPI(id);
  return id;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchCustomerByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleCustomer = action.payload;
      })
      .addCase(fetchCustomerByName.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(customer => customer._id === action.payload._id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(customer => customer._id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
