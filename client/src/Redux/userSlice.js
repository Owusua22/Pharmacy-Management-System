import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, updateUser, deleteUser } from '../api';

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (e) {
    console.error('Could not load user from localStorage', e);
    return null;
  }
};

const saveUserToLocalStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (e) {
    console.error('Could not save user to localStorage', e);
  }
};

const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token from localStorage
  } catch (e) {
    console.error('Could not remove user from localStorage', e);
  }
};

export const register = createAsyncThunk('users/register', async (userData) => {
  const response = await registerUser(userData);
  return response;
});

export const login = createAsyncThunk('users/login', async (userData) => {
  const response = await loginUser(userData);
  const { token, ...user } = response;
  localStorage.setItem('token', token); // Save token to localStorage
  return user;
});

export const update = createAsyncThunk('users/update', async ({ userData, userId }) => {
  const response = await updateUser(userData, userId);
  return response;
});

export const remove = createAsyncThunk('users/delete', async (userId) => {
  const response = await deleteUser(userId);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: loadUserFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveUserToLocalStorage(state.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveUserToLocalStorage(state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveUserToLocalStorage(state.user);
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(remove.pending, (state) => {
        state.loading = true;
      })
      .addCase(remove.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        removeUserFromLocalStorage();
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
