import { createSlice, /*nanoid,*/ createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/payment_methods';

const initialState = {
    paymentMethods: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchPaymentMethods = createAsyncThunk('paymentMethods/fetchPaymentMethods', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPaymentMethod = createAsyncThunk('paymentMethods/addNewPaymentMethod', async (initialPaymentMethod) => {
    try {
        const response = await axios.post(ITEMS_URL, initialPaymentMethod)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updatePaymentMethod = createAsyncThunk('paymentMethods/updatePaymentMethod', async (initialPaymentMethod) => {
    const { id } = initialPaymentMethod;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialPaymentMethod)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPaymentMethod; // only for testing Redux!
    }
})

export const deletePaymentMethod = createAsyncThunk('paymentMethods/deletePaymentMethod', async (initialPaymentMethod) => {
    const { id } = initialPaymentMethod;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialPaymentMethod;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const paymentMethodsSlice = createSlice({
    name:'paymentMethods',
    initialState,
    reducers: {
        paymentMethodAdded: {
            reducer(state, action) {
                state.paymentMethods.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPaymentMethods.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched paymentMethods to the array
                
                state.paymentMethods = action.payload
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPaymentMethod.fulfilled, (state, action) => {                
                state.paymentMethods.push(action.payload)
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.paymentMethods.findIndex(a => a.id === id);
                state.paymentMethods[updatedIndex] = action.payload;
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.paymentMethods.filter(at => at.id !== id);
                state.paymentMethods = accs;
            })
            .addCase(deletePaymentMethod.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPaymentMethods = (state) => state.paymentMethods.paymentMethods;
export const getPaymentMethodsStatus = (state) => state.paymentMethods.status;
export const getPaymentMethodsError = (state) => state.paymentMethods.error;

export const selectPaymentMethodById = (state, aId) =>
    state.paymentMethods.paymentMethods.find(a => a.id === aId);
 
export const {paymentMethodAdded} = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer