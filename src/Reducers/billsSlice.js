import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/bills';

const initialState = {
    bills: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchBills = createAsyncThunk('bills/fetchBills', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchBillsWithOpenBalance = createAsyncThunk('bills/fetchBillsWithOpenBalance', async () => {
    try {
        const response = await axios.get(`${ITEMS_URL}/open_balance/`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchBillById = createAsyncThunk('bills/fetchBillById', async (initialBill) => {
    const { id } = initialBill;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewBill = createAsyncThunk('bills/addNewBill', async (initialBill) => {
    try {
        const response = await axios.post(ITEMS_URL, initialBill)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateBill = createAsyncThunk('bills/updateBill', async (initialBill) => {
    const { id } = initialBill;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialBill)
        return response.data
    } catch (err) {
        //return err.message;
        return initialBill; // only for testing Redux!
    }
})

export const updateSomeBills = createAsyncThunk('bills/updateSomeBills', async (initialBill) => {
    // const { id } = initialBill;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_bills/0`, initialBill)
        return response.data
    } catch (err) {
        //return err.message;
        return initialBill; // only for testing Redux!
    }
})
// 
export const deleteBill = createAsyncThunk('bills/deleteBill', async (initialBill) => {
    const { id } = initialBill;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialBill;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const billsSlice = createSlice({
    name:'bills',
    initialState,
    reducers: {
        billAdded: {
            reducer(state, action) {
                state.bills.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBills.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBills.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched bills to the array
                
                state.bills = action.payload
            })
            .addCase(fetchBills.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })//===============================================
            .addCase(fetchBillsWithOpenBalance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBillsWithOpenBalance.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bills = action.payload
            })
            .addCase(fetchBillsWithOpenBalance.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })//===============================================
            .addCase(fetchBillById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.bills = action.payload
            })
            .addCase(addNewBill.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.bills.push(action.payload)
            })
            .addCase(updateBill.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.bills.findIndex(a => a.id == id);
                state.bills[updatedIndex] = action.payload;
            })
            .addCase(updateSomeBills.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // const { id } = action.payload;
                // const updatedIndex = state.bills.findIndex(a => a.id == id);
                // state.bills[updatedIndex] = action.payload;
            })
            .addCase(deleteBill.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.bills.filter(at => at.id !== id);
                state.bills = accs;
            })
            .addCase(deleteBill.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllBills = (state) => state.bills.bills;
export const getBillsStatus = (state) => state.bills.status;
export const getBillsError = (state) => state.bills.error;

export const selectBillById = (state, aId) =>  state.bills.bills.find(a => a.id === aId);

 
export const {billAdded} = billsSlice.actions;

export default billsSlice.reducer