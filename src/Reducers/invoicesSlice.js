import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/invoices';

const initialState = {
    invoices: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchInvoicesWithOpenBalance = createAsyncThunk('invoices/fetchInvoicesWithOpenBalance', async () => {
    try {
        const response = await axios.get(`${ITEMS_URL}/open_balance/`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchInvoiceById = createAsyncThunk('invoices/fetchInvoiceById', async (initialInvoice) => {
    const { id } = initialInvoice;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewInvoice = createAsyncThunk('invoices/addNewInvoice', async (initialInvoice) => {
    try {
        const response = await axios.post(ITEMS_URL, initialInvoice)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateInvoice = createAsyncThunk('invoices/updateInvoice', async (initialInvoice) => {
    const { id } = initialInvoice;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialInvoice)
        return response.data
    } catch (err) {
        //return err.message;
        return initialInvoice; // only for testing Redux!
    }
})

export const updateSomeInvoices = createAsyncThunk('invoices/updateSomeInvoices', async (initialInvoice) => {
    // const { id } = initialInvoice;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_invoices/0`, initialInvoice)
        return response.data
    } catch (err) {
        //return err.message;
        return initialInvoice; // only for testing Redux!
    }
})
// 
export const deleteInvoice = createAsyncThunk('invoices/deleteInvoice', async (initialInvoice) => {
    const { id } = initialInvoice;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialInvoice;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const invoicesSlice = createSlice({
    name:'invoices',
    initialState,
    reducers: {
        invoiceAdded: {
            reducer(state, action) {
                state.invoices.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchInvoices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched invoices to the array
                
                state.invoices = action.payload
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })//===============================================
            .addCase(fetchInvoicesWithOpenBalance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchInvoicesWithOpenBalance.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.invoices = action.payload
            })
            .addCase(fetchInvoicesWithOpenBalance.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })//===============================================
            .addCase(fetchInvoiceById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.invoices = action.payload
            })
            .addCase(addNewInvoice.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.invoices.push(action.payload)
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.invoices.findIndex(a => a.id == id);
                state.invoices[updatedIndex] = action.payload;
            })
            .addCase(updateSomeInvoices.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // const { id } = action.payload;
                // const updatedIndex = state.invoices.findIndex(a => a.id == id);
                // state.invoices[updatedIndex] = action.payload;
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.invoices.filter(at => at.id !== id);
                state.invoices = accs;
            })
            .addCase(deleteInvoice.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllInvoices = (state) => state.invoices.invoices;
export const getInvoicesStatus = (state) => state.invoices.status;
export const getInvoicesError = (state) => state.invoices.error;

export const selectInvoiceById = (state, aId) =>  state.invoices.invoices.find(a => a.id === aId);

 
export const {invoiceAdded} = invoicesSlice.actions;

export default invoicesSlice.reducer