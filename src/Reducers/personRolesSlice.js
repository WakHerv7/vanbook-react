import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/person_roles';

const initialState = {
    personRoles: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchPersonRoles = createAsyncThunk('personRoles/fetchPersonRoles', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPersonRole = createAsyncThunk('personRoles/addNewPersonRole', async (initialPersonRole) => {
    try {
        const response = await axios.post(ITEMS_URL, initialPersonRole)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updatePersonRole = createAsyncThunk('personRoles/updatePersonRole', async (initialPersonRole) => {
    const { id } = initialPersonRole;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialPersonRole)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPersonRole; // only for testing Redux!
    }
})

export const deletePersonRole = createAsyncThunk('personRoles/deletePersonRole', async (initialPersonRole) => {
    const { id } = initialPersonRole;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialPersonRole;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const personRolesSlice = createSlice({
    name:'personRoles',
    initialState,
    reducers: {
        personRoleAdded: {
            reducer(state, action) {
                state.personRoles.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPersonRoles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPersonRoles.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched personRoles to the array
                
                state.personRoles = action.payload
            })
            .addCase(fetchPersonRoles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPersonRole.fulfilled, (state, action) => {                
                state.personRoles.push(action.payload)
            })
            .addCase(updatePersonRole.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.personRoles.findIndex(a => a.id == id);
                state.personRoles[updatedIndex] = action.payload;
            })
            .addCase(deletePersonRole.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.personRoles.filter(at => at.id !== id);
                state.personRoles = accs;
            })
            .addCase(deletePersonRole.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPersonRoles = (state) => state.personRoles.personRoles;
export const getPersonRolesStatus = (state) => state.personRoles.status;
export const getPersonRolesError = (state) => state.personRoles.error;

export const selectPersonRoleById = (state, aId) =>
    state.personRoles.personRoles.find(a => a.id === aId);
 
export const {personRoleAdded} = personRolesSlice.actions;

export default personRolesSlice.reducer