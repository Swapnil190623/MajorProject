import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    invoices: [],
    loading: false,
    error: null,
};

export const fetchInvoicesByProject = createAsyncThunk(
    'invoices/fetchInvoicesByProject',
    async (projectId) => {
        try {
            const response = await axios.get(`/api/invoices/projects/${projectId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch invoices');
        }
    }
);

export const createInvoice = createAsyncThunk(
    'invoices/createInvoice',
    async ({ projectId, invoiceData }) => {
        try {
            const response = await axios.post(`/api/invoices/generate-invoice/${projectId}`, invoiceData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to create invoice');
        }
    }
);

export const deleteInvoice = createAsyncThunk(
    'invoices/deleteInvoice',
    async (invoiceId) => {
        try {
            await axios.delete(`/api/invoices/${invoiceId}`);
            return invoiceId;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to delete invoice');
        }
    }
);

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoicesByProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoicesByProject.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(fetchInvoicesByProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createInvoice.pending, (state) => {
                state.loading = true;
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices.push(action.payload);
            })
            .addCase(createInvoice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteInvoice.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default invoiceSlice.reducer;