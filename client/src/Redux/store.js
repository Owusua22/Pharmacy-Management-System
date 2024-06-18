import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import inventoryReducer from './inventorySlice';
import salesReducer from './salesSlice';
import prescriptionsReducer from './prescriptionsSlice';
import customerReducer from './customerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
    prescriptions: prescriptionsReducer,
    customers: customerReducer,
  },

});

export default store;
