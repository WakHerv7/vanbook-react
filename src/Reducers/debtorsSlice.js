import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/debtors';

const initialState = {
    debtors: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchDebtors = createAsyncThunk('debtors/fetchDebtors', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

// export const fetchDebtorsPaymentNotReceived = createAsyncThunk('debtors/fetchDebtorsPaymentNotReceived', async () => {
//     try {
//         const response = await axios.get(`${ITEMS_URL}/payment_not_received/`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const fetchDebtorById = createAsyncThunk('debtors/fetchDebtorById', async (initialDebtor) => {
//     const { id } = initialDebtor;
//     try {
//         const response = await axios.get(`${ITEMS_URL}/${id}`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const addNewDebtor = createAsyncThunk('debtors/addNewDebtor', async (initialDebtor) => {
//     try {
//         const response = await axios.post(ITEMS_URL, initialDebtor)
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// })

// export const updateDebtor = createAsyncThunk('debtors/updateDebtor', async (initialDebtor) => {
//     const { id } = initialDebtor;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/${id}`, initialDebtor)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialDebtor; // only for testing Redux!
//     }
// })

// export const updateSomeDebtors = createAsyncThunk('debtors/updateSomeDebtors', async (initialDebtor) => {
//     // const { id } = initialDebtor;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/update_debtors/0`, initialDebtor)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialDebtor; // only for testing Redux!
//     }
// })
// // 
// export const deleteDebtor = createAsyncThunk('debtors/deleteDebtor', async (initialDebtor) => {
//     const { id } = initialDebtor;
//     try {
//         const response = await axios.delete(`${ITEMS_URL}/${id}`)
//         if (response?.status === 200) return initialDebtor;
//         return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//         return err.message;
//     }
// })
// *******************************************************************************
// *******************************************************************************


const debtorsSlice = createSlice({
    name:'debtors',
    initialState,
    reducers: {
        debtorAdded: {
            reducer(state, action) {
                state.debtors.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDebtors.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDebtors.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                state.debtors = action.payload
            })
            .addCase(fetchDebtors.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(fetchDebtorsPaymentNotReceived.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchDebtorsPaymentNotReceived.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                
            //     // Add any fetched debtors to the array
                
            //     state.debtors = action.payload
            // })
            // .addCase(fetchDebtorsPaymentNotReceived.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })            
            // .addCase(fetchDebtorById.fulfilled, (state, action) => {                
            //     state.status = 'succeeded'
            //     state.debtors = action.payload
            // })
            // .addCase(addNewDebtor.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                  
            //     state.debtors.push(action.payload)
            // })
            // .addCase(updateDebtor.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const updatedIndex = state.debtors.findIndex(a => a.id == id);
            //     state.debtors[updatedIndex] = action.payload;
            // })
            // .addCase(updateSomeDebtors.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     // const { id } = action.payload;
            //     // const updatedIndex = state.debtors.findIndex(a => a.id == id);
            //     // state.debtors[updatedIndex] = action.payload;
            // })
            // .addCase(deleteDebtor.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Delete could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const accs = state.debtors.filter(at => at.id !== id);
            //     state.debtors = accs;
            // })
            // .addCase(deleteDebtor.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
    }
})

export const selectAllDebtors = (state) => state.debtors.debtors;
export const getDebtorsStatus = (state) => state.debtors.status;
export const getDebtorsError = (state) => state.debtors.error;

export const selectDebtorById = (state, aId) =>  state.debtors.debtors.find(a => a.id === aId);

export const {debtorAdded} = debtorsSlice.actions;

export default debtorsSlice.reducer