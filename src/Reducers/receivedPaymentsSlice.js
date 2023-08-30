import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/receive_payments';

const initialState = {
    receivedPayments: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchReceivedPayments = createAsyncThunk('receive_payments/fetchReceivedPayments', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchReceivedPaymentById = createAsyncThunk('receive_payments/fetchReceivedPaymentById', async (initialReceivedPayment) => {
    const { id } = initialReceivedPayment;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewReceivedPayment = createAsyncThunk('receive_payments/addNewReceivedPayment', async (initialReceivedPayment) => {
    try {
        const response = await axios.post(ITEMS_URL, initialReceivedPayment)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateReceivedPayment = createAsyncThunk('receive_payments/updateReceivedPayment', async (initialReceivedPayment) => {
    const { id } = initialReceivedPayment;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialReceivedPayment)
        return response.data
    } catch (err) {
        //return err.message;
        return initialReceivedPayment; // only for testing Redux!
    }
})

export const updateSomeReceivedPayments = createAsyncThunk('receive_payments/updateSomeReceivedPayments', async (initialReceivedPayment) => {
    // const { id } = initialReceivedPayment;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_receivedPayments/0`, initialReceivedPayment)
        return response.data
    } catch (err) {
        //return err.message;
        return initialReceivedPayment; // only for testing Redux!
    }
})
// 
export const deleteReceivedPayment = createAsyncThunk('receivedPayments/deleteReceivedPayment', async (initialReceivedPayment) => {
    const { id } = initialReceivedPayment;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialReceivedPayment;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const receivedPaymentsSlice = createSlice({
    name:'receivedPayments',
    initialState,
    reducers: {
        receivedPaymentAdded: {
            reducer(state, action) {
                state.receivedPayments.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchReceivedPayments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReceivedPayments.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched receivedPayments to the array
                
                state.receivedPayments = action.payload
            })
            .addCase(fetchReceivedPayments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })                  
            .addCase(fetchReceivedPaymentById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.receivedPayments = action.payload
            })
            .addCase(addNewReceivedPayment.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.receivedPayments.push(action.payload)
            })
            .addCase(updateReceivedPayment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.receivedPayments.findIndex(a => a.id == id);
                state.receivedPayments[updatedIndex] = action.payload;
            })
            .addCase(updateSomeReceivedPayments.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // const { id } = action.payload;
                // const updatedIndex = state.receivedPayments.findIndex(a => a.id == id);
                // state.receivedPayments[updatedIndex] = action.payload;
            })
            .addCase(deleteReceivedPayment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.receivedPayments.filter(at => at.id !== id);
                state.receivedPayments = accs;
            })
            .addCase(deleteReceivedPayment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllReceivedPayments = (state) => state.receivedPayments.receivedPayments;
export const getReceivedPaymentsStatus = (state) => state.receivedPayments.status;
export const getReceivedPaymentsError = (state) => state.receivedPayments.error;

export const selectReceivedPaymentById = (state, aId) =>  state.receivedPayments.receivedPayments.find(a => a.id === aId);

 
export const {receivedPaymentAdded} = receivedPaymentsSlice.actions;

export default receivedPaymentsSlice.reducer