import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/receipts';

const initialState = {
    receipts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchReceipts = createAsyncThunk('receipts/fetchReceipts', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchReceiptsUndeposited = createAsyncThunk('receipts/fetchReceiptsUndeposited', async () => {
    try {
        const response = await axios.get(`${ITEMS_URL}/undeposited/`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchReceiptsPaymentNotReceived = createAsyncThunk('receipts/fetchReceiptsPaymentNotReceived', async () => {
    try {
        const response = await axios.get(`${ITEMS_URL}/payment_not_received/`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchReceiptById = createAsyncThunk('receipts/fetchReceiptById', async (initialReceipt) => {
    const { id } = initialReceipt;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewReceipt = createAsyncThunk('receipts/addNewReceipt', async (initialReceipt) => {
    try {
        const response = await axios.post(ITEMS_URL, initialReceipt)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateReceipt = createAsyncThunk('receipts/updateReceipt', async (initialReceipt) => {
    const { id } = initialReceipt;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialReceipt)
        return response.data
    } catch (err) {
        //return err.message;
        return initialReceipt; // only for testing Redux!
    }
})

export const updateSomeReceipts = createAsyncThunk('receipts/updateSomeReceipts', async (initialReceipt) => {
    // const { id } = initialReceipt;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_receipts/0`, initialReceipt)
        return response.data
    } catch (err) {
        //return err.message;
        return initialReceipt; // only for testing Redux!
    }
})
// 
export const deleteReceipt = createAsyncThunk('receipts/deleteReceipt', async (initialReceipt) => {
    const { id } = initialReceipt;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialReceipt;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const receiptsSlice = createSlice({
    name:'receipts',
    initialState,
    reducers: {
        receiptAdded: {
            reducer(state, action) {
                state.receipts.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchReceipts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReceipts.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched receipts to the array
                
                state.receipts = action.payload
            })
            .addCase(fetchReceipts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchReceiptsUndeposited.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReceiptsUndeposited.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched receipts to the array
                
                state.receipts = action.payload
            })
            .addCase(fetchReceiptsUndeposited.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            }) 
            .addCase(fetchReceiptsPaymentNotReceived.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReceiptsPaymentNotReceived.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched receipts to the array
                
                state.receipts = action.payload
            })
            .addCase(fetchReceiptsPaymentNotReceived.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })            
            .addCase(fetchReceiptById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.receipts = action.payload
            })
            .addCase(addNewReceipt.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.receipts.push(action.payload)
            })
            .addCase(updateReceipt.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.receipts.findIndex(a => a.id == id);
                state.receipts[updatedIndex] = action.payload;
            })
            .addCase(updateSomeReceipts.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // const { id } = action.payload;
                // const updatedIndex = state.receipts.findIndex(a => a.id == id);
                // state.receipts[updatedIndex] = action.payload;
            })
            .addCase(deleteReceipt.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.receipts.filter(at => at.id !== id);
                state.receipts = accs;
            })
            .addCase(deleteReceipt.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllReceipts = (state) => state.receipts.receipts;
export const getReceiptsStatus = (state) => state.receipts.status;
export const getReceiptsError = (state) => state.receipts.error;

export const selectReceiptById = (state, aId) =>  state.receipts.receipts.find(a => a.id === aId);

 
export const {receiptAdded} = receiptsSlice.actions;

export default receiptsSlice.reducer