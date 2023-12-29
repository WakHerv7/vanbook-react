import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/cashbook';

const initialState = {
    cashbook: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchCashbook = createAsyncThunk('cashbook/fetchCashbook', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

// export const fetchCashbookPaymentNotReceived = createAsyncThunk('cashbook/fetchCashbookPaymentNotReceived', async () => {
//     try {
//         const response = await axios.get(`${ITEMS_URL}/payment_not_received/`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const fetchCashbookItemById = createAsyncThunk('cashbook/fetchCashbookItemById', async (initialCashbookItem) => {
//     const { id } = initialCashbookItem;
//     try {
//         const response = await axios.get(`${ITEMS_URL}/${id}`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const addNewCashbookItem = createAsyncThunk('cashbook/addNewCashbookItem', async (initialCashbookItem) => {
//     try {
//         const response = await axios.post(ITEMS_URL, initialCashbookItem)
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// })

// export const updateCashbookItem = createAsyncThunk('cashbook/updateCashbookItem', async (initialCashbookItem) => {
//     const { id } = initialCashbookItem;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/${id}`, initialCashbookItem)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialCashbookItem; // only for testing Redux!
//     }
// })

// export const updateSomeCashbook = createAsyncThunk('cashbook/updateSomeCashbook', async (initialCashbookItem) => {
//     // const { id } = initialCashbookItem;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/update_cashbook/0`, initialCashbookItem)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialCashbookItem; // only for testing Redux!
//     }
// })
// // 
// export const deleteCashbookItem = createAsyncThunk('cashbook/deleteCashbookItem', async (initialCashbookItem) => {
//     const { id } = initialCashbookItem;
//     try {
//         const response = await axios.delete(`${ITEMS_URL}/${id}`)
//         if (response?.status === 200) return initialCashbookItem;
//         return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//         return err.message;
//     }
// })
// *******************************************************************************
// *******************************************************************************


const cashbookSlice = createSlice({
    name:'cashbook',
    initialState,
    reducers: {
        cashbookItemAdded: {
            reducer(state, action) {
                state.cashbook.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCashbook.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCashbook.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                state.cashbook = action.payload
            })
            .addCase(fetchCashbook.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(fetchCashbookPaymentNotReceived.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchCashbookPaymentNotReceived.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                
            //     // Add any fetched cashbook to the array
                
            //     state.cashbook = action.payload
            // })
            // .addCase(fetchCashbookPaymentNotReceived.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })            
            // .addCase(fetchCashbookItemById.fulfilled, (state, action) => {                
            //     state.status = 'succeeded'
            //     state.cashbook = action.payload
            // })
            // .addCase(addNewCashbookItem.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                  
            //     state.cashbook.push(action.payload)
            // })
            // .addCase(updateCashbookItem.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const updatedIndex = state.cashbook.findIndex(a => a.id == id);
            //     state.cashbook[updatedIndex] = action.payload;
            // })
            // .addCase(updateSomeCashbook.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     // const { id } = action.payload;
            //     // const updatedIndex = state.cashbook.findIndex(a => a.id == id);
            //     // state.cashbook[updatedIndex] = action.payload;
            // })
            // .addCase(deleteCashbookItem.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Delete could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const accs = state.cashbook.filter(at => at.id !== id);
            //     state.cashbook = accs;
            // })
            // .addCase(deleteCashbookItem.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
    }
})

export const selectAllCashbook = (state) => state.cashbook.cashbook;
export const getCashbookStatus = (state) => state.cashbook.status;
export const getCashbookError = (state) => state.cashbook.error;

export const selectCashbookItemById = (state, aId) =>  state.cashbook.cashbook.find(a => a.id === aId);

export const {cashbookItemAdded} = cashbookSlice.actions;

export default cashbookSlice.reducer