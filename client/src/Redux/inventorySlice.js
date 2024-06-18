import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInventoriesAPI, addInventoryAPI, updateInventoryAPI, deleteInventoryAPI } from '../api';

export const fetchInventories = createAsyncThunk('inventory/fetchInventories', async () => {
  const response = await fetchInventoriesAPI();
  return response.data;
});

export const addInventory = createAsyncThunk('inventory/addInventory', async (inventory) => {
  const response = await addInventoryAPI(inventory);
  return response.data;
});

export const updateInventory = createAsyncThunk('inventory/updateInventory', async ({ id, inventory }) => {
  const response = await updateInventoryAPI(id, inventory);
  return response.data;
});

export const deleteInventory = createAsyncThunk('inventory/deleteInventory', async (id) => {
  await deleteInventoryAPI(id);
  return id;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],  // Renamed to match the extraReducers structure
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addInventory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;
