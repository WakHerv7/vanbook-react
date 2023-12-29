import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/pay_bills';

const initialState = {
    billPayments: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchBillPayments = createAsyncThunk('pay_bills/fetchBillPayments', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchBillPaymentById = createAsyncThunk('pay_bills/fetchBillPaymentById', async (initialBillPayment) => {
    const { id } = initialBillPayment;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewBillPayment = createAsyncThunk('pay_bills/addNewBillPayment', async (initialBillPayment) => {
    try {
        const response = await axios.post(ITEMS_URL, initialBillPayment)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateBillPayment = createAsyncThunk('pay_bills/updateBillPayment', async (initialBillPayment) => {
    const { id } = initialBillPayment;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialBillPayment)
        return response.data
    } catch (err) {
        //return err.message;
        return initialBillPayment; // only for testing Redux!
    }
})

export const updateSomeBillPayments = createAsyncThunk('pay_bills/updateSomeBillPayments', async (initialBillPayment) => {
    // const { id } = initialBillPayment;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_billPayments/0`, initialBillPayment)
        return response.data
    } catch (err) {
        //return err.message;
        return initialBillPayment; // only for testing Redux!
    }
})
// 
export const deleteBillPayment = createAsyncThunk('billPayments/deleteBillPayment', async (initialBillPayment) => {
    const { id } = initialBillPayment;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialBillPayment;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const billPaymentsSlice = createSlice({
    name:'billPayments',
    initialState,
    reducers: {
        billPaymentAdded: {
            reducer(state, action) {
                state.billPayments.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBillPayments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBillPayments.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched billPayments to the array
                
                state.billPayments = action.payload
            })
            .addCase(fetchBillPayments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })                  
            .addCase(fetchBillPaymentById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.billPayments = action.payload
            })
            .addCase(addNewBillPayment.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.billPayments.push(action.payload)
            })
            .addCase(updateBillPayment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.billPayments.findIndex(a => a.id == id);
                state.billPayments[updatedIndex] = action.payload;
            })
            .addCase(updateSomeBillPayments.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
            })
            .addCase(deleteBillPayment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.billPayments.filter(at => at.id !== id);
                state.billPayments = accs;
            })
            .addCase(deleteBillPayment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllBillPayments = (state) => state.billPayments.billPayments;
export const getBillPaymentsStatus = (state) => state.billPayments.status;
export const getBillPaymentsError = (state) => state.billPayments.error;

export const selectBillPaymentById = (state, aId) =>  state.billPayments.billPayments.find(a => a.id === aId);

 
export const {billPaymentAdded} = billPaymentsSlice.actions;

export default billPaymentsSlice.reducer