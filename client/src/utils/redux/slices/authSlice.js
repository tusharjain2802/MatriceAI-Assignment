import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../../auth';


export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await apiLogin(credentials.email, credentials.password);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to login');
    }
});


export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await apiRegister(userData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to register');
    }
});

const initialState = {
    user: null,
    email:null,
    token: null,
    role: null,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            apiLogout();  // Remove token from storage
            state.user = null;
            state.email = null;
            state.token = null;
            state.role = null;
        },
        setAuthData(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.email = action.payload.email;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const payload = action.payload;
                state.user = payload.name;
                state.token = payload.token;
                state.role = payload.designation;
                state.email = payload.email;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.user = user;
                state.token = null;  // Assuming no token is returned on registration
                state.role = user.designation;  // Assuming the role is stored as `designation`
                state.isLoading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { logout, setAuthData } = authSlice.actions;

export default authSlice.reducer;
