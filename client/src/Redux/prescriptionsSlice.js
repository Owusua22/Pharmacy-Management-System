// src/Redux/prescriptionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPrescriptionsAPI, addPrescriptionsAPI, updatePrescriptionsAPI, deletePrescriptionsAPI } from '../api';

export const fetchPrescriptions = createAsyncThunk('prescriptions/fetchPrescriptions', async () => {
  const response = await fetchPrescriptionsAPI();
  return response.data;
});

export const addPrescription = createAsyncThunk('prescriptions/addPrescription', async (prescription) => {
  const response = await addPrescriptionsAPI(prescription);
  return response.data;
});

export const updatePrescription = createAsyncThunk('prescriptions/updatePrescription', async ({ id, prescription }) => {
  const response = await updatePrescriptionsAPI(id, prescription);
  return response.data;
});

export const deletePrescription = createAsyncThunk('prescriptions/deletePrescription', async (id) => {
  await deletePrescriptionsAPI(id);
  return id;
});

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    prescriptions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrescriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prescriptions = action.payload;
      })
      .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPrescription.fulfilled, (state, action) => {
        state.prescriptions.push(action.payload);
      })
      .addCase(updatePrescription.fulfilled, (state, action) => {
        const index = state.prescriptions.findIndex(p => p._id === action.payload._id);
        state.prescriptions[index] = action.payload;
      })
      .addCase(deletePrescription.fulfilled, (state, action) => {
        state.prescriptions = state.prescriptions.filter(p => p._id !== action.payload);
      });
  },
});

export default prescriptionSlice.reducer;
