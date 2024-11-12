import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    files: [],
    loading: false,
    error: null,
};

export const fetchFilesByProject = createAsyncThunk(
    'files/fetchFilesByProject',
    async (projectId) => {
        try {
            const response = await axios.get(`/api/files/get-file/${projectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch files');
        }
    }
);

export const uploadFile = createAsyncThunk(
    'files/uploadFile',
    async ({ projectId, file }) => {
        try {
            const response = await axios.post(`/api/files/upload-file/${projectId}`, file);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to upload file');
        }
    }
);

export const deleteFile = createAsyncThunk(
    'files/deleteFile',
    async (fileId) => {
        try {
            await axios.delete(`/api/files/${fileId}`);
            return fileId;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to delete file');
        }
    }
);

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilesByProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilesByProject.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchFilesByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files.push(action.payload);
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files = state.files.filter((file) => file.id !== action.payload);
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default fileSlice.reducer;