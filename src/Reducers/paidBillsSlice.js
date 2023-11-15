import { createSlice, /*nanoid,*/ createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/receive_payments';

const initialState = {
    paidBills: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchPaidBills = createAsyncThunk('receive_payments/fetchPaidBills', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchPaidBillById = createAsyncThunk('receive_payments/fetchPaidBillById', async (initialPaidBill) => {
    const { id } = initialPaidBill;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPaidBill = createAsyncThunk('receive_payments/addNewPaidBill', async (initialPaidBill) => {
    try {
        const response = await axios.post(ITEMS_URL, initialPaidBill)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updatePaidBill = createAsyncThunk('receive_payments/updatePaidBill', async (initialPaidBill) => {
    const { id } = initialPaidBill;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialPaidBill)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPaidBill; // only for testing Redux!
    }
})

export const updateSomePaidBills = createAsyncThunk('receive_payments/updateSomePaidBills', async (initialPaidBill) => {
    // const { id } = initialPaidBill;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_paidBills/0`, initialPaidBill)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPaidBill; // only for testing Redux!
    }
})
// 
export const deletePaidBill = createAsyncThunk('paidBills/deletePaidBill', async (initialPaidBill) => {
    const { id } = initialPaidBill;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialPaidBill;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const paidBillsSlice = createSlice({
    name:'paidBills',
    initialState,
    reducers: {
        paidBillAdded: {
            reducer(state, action) {
                state.paidBills.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPaidBills.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPaidBills.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched paidBills to the array
                
                state.paidBills = action.payload
            })
            .addCase(fetchPaidBills.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })                  
            .addCase(fetchPaidBillById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.paidBills = action.payload
            })
            .addCase(addNewPaidBill.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.paidBills.push(action.payload)
            })
            .addCase(updatePaidBill.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.paidBills.findIndex(a => a.id === id);
                state.paidBills[updatedIndex] = action.payload;
            })
            .addCase(updateSomePaidBills.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
            })
            .addCase(deletePaidBill.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.paidBills.filter(at => at.id !== id);
                state.paidBills = accs;
            })
            .addCase(deletePaidBill.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPaidBills = (state) => state.paidBills.paidBills;
export const getPaidBillsStatus = (state) => state.paidBills.status;
export const getPaidBillsError = (state) => state.paidBills.error;

export const selectPaidBillById = (state, aId) =>  state.paidBills.paidBills.find(a => a.id === aId);

 
export const {paidBillAdded} = paidBillsSlice.actions;

export default paidBillsSlice.reducer