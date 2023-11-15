import { createSlice, /*nanoid,*/ createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/persons';

const initialState = {
    persons: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchPersons = createAsyncThunk('persons/fetchPersons', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchPersonsByRole = createAsyncThunk('persons/fetchPersonsByRole', async (primenumber) => {
    try {
        const response = await axios.get(`${ITEMS_URL}/role/${primenumber}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPerson = createAsyncThunk('persons/addNewPerson', async (initialPerson) => {
    try {
        const response = await axios.post(ITEMS_URL, initialPerson)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updatePerson = createAsyncThunk('persons/updatePerson', async (initialPerson) => {
    const { id } = initialPerson;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialPerson)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPerson; // only for testing Redux!
    }
})

export const deletePerson = createAsyncThunk('persons/deletePerson', async (initialPerson) => {
    const { id } = initialPerson;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialPerson;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const personsSlice = createSlice({
    name:'persons',
    initialState,
    reducers: {
        personAdded: {
            reducer(state, action) {
                state.persons.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPersons.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPersons.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched persons to the array
                
                state.persons = action.payload
            })
            .addCase(fetchPersons.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPersonsByRole.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPersonsByRole.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched persons to the array
                
                state.persons = action.payload
            })
            .addCase(fetchPersonsByRole.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPerson.fulfilled, (state, action) => {                
                state.persons.push(action.payload)
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.persons.findIndex(a => a.id === id);
                state.persons[updatedIndex] = action.payload;
            })
            .addCase(deletePerson.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.persons.filter(at => at.id !== id);
                state.persons = accs;
            })
            .addCase(deletePerson.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPersons = (state) => state.persons.persons;
export const getPersonsStatus = (state) => state.persons.status;
export const getPersonsError = (state) => state.persons.error;

export const selectPersonById = (state, aId) =>
    state.persons.persons.find(a => a.id === aId);
 
export const {personAdded} = personsSlice.actions;

export default personsSlice.reducer
