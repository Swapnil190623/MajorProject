import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/api/api';


const initialState = {
    isAuthenticated : false,
    currentUser: {
        _id : '',
        username : '',
        email : '',
        fullName : '',
        role : '',
        avatar : ''
    },
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (userData) => {
        try {
            const response = await api.post('/users/login', userData, { withCredentials: true });
            // console.log(response.data.data);
            return response;
        } catch (error) {
            throw new Error(error.response?.data || 'Login failed');
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'users/fetchCurrentUser',
    async () => {
        try {
            const response = await api.get('/users/current-user', { withCredentials: true });
            // console.log(response.data.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch user');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUser: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { currentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;