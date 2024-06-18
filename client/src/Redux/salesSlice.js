import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSalesAPI, deleteSalesAPI, addSalesAPI, updateSalesAPI } from '../api'; // Import your API functions

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await fetchSalesAPI();
  return response.data;
});

export const deleteSale = createAsyncThunk('sales/deleteSale', async (id) => {
  await deleteSalesAPI(id);
  return id;
});


export const addSale = createAsyncThunk('sales/addSale', async (sale) => {
  const response = await addSalesAPI(sale);
  return response.data;
});

export const updateSale = createAsyncThunk('sales/updateSale', async ({ id, sale }) => {
  const response = await updateSalesAPI(id, sale);
  return response.data;
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.sales = state.sales.filter(sale => sale._id !== action.payload);
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.sales.push(action.payload);
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.sales.findIndex(sale => sale._id === action.payload._id);
        state.sales[index] = action.payload;
      });
  },
});

export default salesSlice.reducer;
