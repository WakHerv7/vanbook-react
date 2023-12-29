import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/creditors';

const initialState = {
    creditors: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchCreditors = createAsyncThunk('creditors/fetchCreditors', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

// export const fetchCreditorsPaymentNotReceived = createAsyncThunk('creditors/fetchCreditorsPaymentNotReceived', async () => {
//     try {
//         const response = await axios.get(`${ITEMS_URL}/payment_not_received/`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const fetchCreditorById = createAsyncThunk('creditors/fetchCreditorById', async (initialCreditor) => {
//     const { id } = initialCreditor;
//     try {
//         const response = await axios.get(`${ITEMS_URL}/${id}`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const addNewCreditor = createAsyncThunk('creditors/addNewCreditor', async (initialCreditor) => {
//     try {
//         const response = await axios.post(ITEMS_URL, initialCreditor)
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// })

// export const updateCreditor = createAsyncThunk('creditors/updateCreditor', async (initialCreditor) => {
//     const { id } = initialCreditor;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/${id}`, initialCreditor)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialCreditor; // only for testing Redux!
//     }
// })

// export const updateSomeCreditors = createAsyncThunk('creditors/updateSomeCreditors', async (initialCreditor) => {
//     // const { id } = initialCreditor;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/update_creditors/0`, initialCreditor)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialCreditor; // only for testing Redux!
//     }
// })
// // 
// export const deleteCreditor = createAsyncThunk('creditors/deleteCreditor', async (initialCreditor) => {
//     const { id } = initialCreditor;
//     try {
//         const response = await axios.delete(`${ITEMS_URL}/${id}`)
//         if (response?.status === 200) return initialCreditor;
//         return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//         return err.message;
//     }
// })
// *******************************************************************************
// *******************************************************************************


const creditorsSlice = createSlice({
    name:'creditors',
    initialState,
    reducers: {
        creditorAdded: {
            reducer(state, action) {
                state.creditors.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCreditors.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCreditors.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                state.creditors = action.payload
            })
            .addCase(fetchCreditors.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(fetchCreditorsPaymentNotReceived.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchCreditorsPaymentNotReceived.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                
            //     // Add any fetched creditors to the array
                
            //     state.creditors = action.payload
            // })
            // .addCase(fetchCreditorsPaymentNotReceived.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })            
            // .addCase(fetchCreditorById.fulfilled, (state, action) => {                
            //     state.status = 'succeeded'
            //     state.creditors = action.payload
            // })
            // .addCase(addNewCreditor.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                  
            //     state.creditors.push(action.payload)
            // })
            // .addCase(updateCreditor.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const updatedIndex = state.creditors.findIndex(a => a.id == id);
            //     state.creditors[updatedIndex] = action.payload;
            // })
            // .addCase(updateSomeCreditors.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     // const { id } = action.payload;
            //     // const updatedIndex = state.creditors.findIndex(a => a.id == id);
            //     // state.creditors[updatedIndex] = action.payload;
            // })
            // .addCase(deleteCreditor.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Delete could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const accs = state.creditors.filter(at => at.id !== id);
            //     state.creditors = accs;
            // })
            // .addCase(deleteCreditor.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
    }
})

export const selectAllCreditors = (state) => state.creditors.creditors;
export const getCreditorsStatus = (state) => state.creditors.status;
export const getCreditorsError = (state) => state.creditors.error;

export const selectCreditorById = (state, aId) =>  state.creditors.creditors.find(a => a.id === aId);

export const {creditorAdded} = creditorsSlice.actions;

export default creditorsSlice.reducer