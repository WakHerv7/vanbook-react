import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/deposits';

const initialState = {
    deposits: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchDeposits = createAsyncThunk('deposits/fetchDeposits', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchDepositById = createAsyncThunk('deposits/fetchDepositById', async (initialDeposit) => {
    const { id } = initialDeposit;
    try {
        const response = await axios.get(`${ITEMS_URL}/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewDeposit = createAsyncThunk('deposits/addNewDeposit', async (initialDeposit) => {
    try {
        const response = await axios.post(ITEMS_URL, initialDeposit)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateDeposit = createAsyncThunk('deposits/updateDeposit', async (initialDeposit) => {
    const { id } = initialDeposit;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialDeposit)
        return response.data
    } catch (err) {
        //return err.message;
        return initialDeposit; // only for testing Redux!
    }
})

export const updateSomeDeposits = createAsyncThunk('deposits/updateSomeDeposits', async (initialDeposit) => {
    // const { id } = initialDeposit;
    try {
        const response = await axios.put(`${ITEMS_URL}/update_deposits/0`, initialDeposit)
        return response.data
    } catch (err) {
        //return err.message;
        return initialDeposit; // only for testing Redux!
    }
})
// 
export const deleteDeposit = createAsyncThunk('deposits/deleteDeposit', async (initialDeposit) => {
    const { id } = initialDeposit;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialDeposit;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const depositsSlice = createSlice({
    name:'deposits',
    initialState,
    reducers: {
        depositAdded: {
            reducer(state, action) {
                state.deposits.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDeposits.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDeposits.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched deposits to the array
                
                state.deposits = action.payload
            })
            .addCase(fetchDeposits.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })                  
            .addCase(fetchDepositById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                state.deposits = action.payload
            })
            .addCase(addNewDeposit.fulfilled, (state, action) => {
                state.status = 'succeeded'                  
                state.deposits.push(action.payload)
            })
            .addCase(updateDeposit.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.deposits.findIndex(a => a.id == id);
                state.deposits[updatedIndex] = action.payload;
            })
            .addCase(updateSomeDeposits.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // const { id } = action.payload;
                // const updatedIndex = state.deposits.findIndex(a => a.id == id);
                // state.deposits[updatedIndex] = action.payload;
            })
            .addCase(deleteDeposit.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.deposits.filter(at => at.id !== id);
                state.deposits = accs;
            })
            .addCase(deleteDeposit.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllDeposits = (state) => state.deposits.deposits;
export const getDepositsStatus = (state) => state.deposits.status;
export const getDepositsError = (state) => state.deposits.error;

export const selectDepositById = (state, aId) =>  state.deposits.deposits.find(a => a.id === aId);

 
export const {depositAdded} = depositsSlice.actions;

export default depositsSlice.reducer