import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchPendingUsers = createAsyncThunk('admin/fetchPendingUsers', async (_, thunkAPI) => {
  try {
    const response = await api.get('/admin/users/pending');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchAllowedUsers = createAsyncThunk('admin/fetchAllowedUsers', async (_, thunkAPI) => {
  try {
    const response = await api.get('/admin/users/allowed');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    pendingUsers: [],
    allowedUsers: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.pendingUsers = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllowedUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllowedUsers.fulfilled, (state, action) => {
        state.allowedUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllowedUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default adminSlice.reducer;
