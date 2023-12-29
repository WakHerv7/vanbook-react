import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/journal';

const initialState = {
    journal: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchJournal = createAsyncThunk('journal/fetchJournal', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

// export const fetchJournalPaymentNotReceived = createAsyncThunk('journal/fetchJournalPaymentNotReceived', async () => {
//     try {
//         const response = await axios.get(`${ITEMS_URL}/payment_not_received/`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

// export const fetchJournalItemById = createAsyncThunk('journal/fetchJournalItemById', async (initialJournalItem) => {
//     const { id } = initialJournalItem;
//     try {
//         const response = await axios.get(`${ITEMS_URL}/${id}`)
//         return [...response.data];
//     } catch (err) {
//         return err.message;
//     }
// })

export const addNewJournalItem = createAsyncThunk('journal/addNewJournalItem', async (initialJournalItem) => {
    try {
        const response = await axios.post(ITEMS_URL, initialJournalItem)
        return response.data
    } catch (err) {
        return err.message;
    }
})

// export const updateJournalItem = createAsyncThunk('journal/updateJournalItem', async (initialJournalItem) => {
//     const { id } = initialJournalItem;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/${id}`, initialJournalItem)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialJournalItem; // only for testing Redux!
//     }
// })

// export const updateSomeJournal = createAsyncThunk('journal/updateSomeJournal', async (initialJournalItem) => {
//     // const { id } = initialJournalItem;
//     try {
//         const response = await axios.put(`${ITEMS_URL}/update_journal/0`, initialJournalItem)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialJournalItem; // only for testing Redux!
//     }
// })
// // 
// export const deleteJournalItem = createAsyncThunk('journal/deleteJournalItem', async (initialJournalItem) => {
//     const { id } = initialJournalItem;
//     try {
//         const response = await axios.delete(`${ITEMS_URL}/${id}`)
//         if (response?.status === 200) return initialJournalItem;
//         return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//         return err.message;
//     }
// })
// *******************************************************************************
// *******************************************************************************


const journalSlice = createSlice({
    name:'journal',
    initialState,
    reducers: {
        journalItemAdded: {
            reducer(state, action) {
                state.journal.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchJournal.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchJournal.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                state.journal = action.payload
            })
            .addCase(fetchJournal.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(fetchJournalPaymentNotReceived.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchJournalPaymentNotReceived.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                
            //     // Add any fetched journal to the array
                
            //     state.journal = action.payload
            // })
            // .addCase(fetchJournalPaymentNotReceived.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })            
            // .addCase(fetchJournalItemById.fulfilled, (state, action) => {                
            //     state.status = 'succeeded'
            //     state.journal = action.payload
            // })
            // .addCase(addNewJournalItem.fulfilled, (state, action) => {
            //     state.status = 'succeeded'                  
            //     state.journal.push(action.payload)
            // })
            // .addCase(updateJournalItem.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const updatedIndex = state.journal.findIndex(a => a.id == id);
            //     state.journal[updatedIndex] = action.payload;
            // })
            // .addCase(updateSomeJournal.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Update could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     // const { id } = action.payload;
            //     // const updatedIndex = state.journal.findIndex(a => a.id == id);
            //     // state.journal[updatedIndex] = action.payload;
            // })
            // .addCase(deleteJournalItem.fulfilled, (state, action) => {
            //     if (!action.payload?.id) {
            //         console.log('Delete could not complete')
            //         console.log(action.payload)
            //         return;
            //     }
            //     const { id } = action.payload;
            //     const accs = state.journal.filter(at => at.id !== id);
            //     state.journal = accs;
            // })
            // .addCase(deleteJournalItem.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
    }
})

export const selectAllJournal = (state) => state.journal.journal;
export const getJournalStatus = (state) => state.journal.status;
export const getJournalError = (state) => state.journal.error;

export const selectJournalItemById = (state, aId) =>  state.journal.journal.find(a => a.id === aId);

export const {journalItemAdded} = journalSlice.actions;

export default journalSlice.reducer