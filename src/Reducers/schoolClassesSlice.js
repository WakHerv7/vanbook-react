import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/school_classes';

const initialState = {
    schoolClasses: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchSchoolClasses = createAsyncThunk('schoolClasses/fetchSchoolClasses', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewSchoolClass = createAsyncThunk('schoolClasses/addNewSchoolClass', async (initialSchoolClass) => {
    try {
        const response = await axios.post(ITEMS_URL, initialSchoolClass)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateSchoolClass = createAsyncThunk('schoolClasses/updateSchoolClass', async (initialSchoolClass) => {
    const { id } = initialSchoolClass;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialSchoolClass)
        return response.data
    } catch (err) {
        //return err.message;
        return initialSchoolClass; // only for testing Redux!
    }
})

export const deleteSchoolClass = createAsyncThunk('schoolClasses/deleteSchoolClass', async (initialSchoolClass) => {
    const { id } = initialSchoolClass;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialSchoolClass;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const schoolClassesSlice = createSlice({
    name:'schoolClasses',
    initialState,
    reducers: {
        schoolClassAdded: {
            reducer(state, action) {
                state.schoolClasses.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSchoolClasses.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSchoolClasses.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched schoolClasses to the array
                
                state.schoolClasses = action.payload
            })
            .addCase(fetchSchoolClasses.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewSchoolClass.fulfilled, (state, action) => {                
                state.schoolClasses.push(action.payload)
            })
            .addCase(updateSchoolClass.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.schoolClasses.findIndex(a => a.id == id);
                state.schoolClasses[updatedIndex] = action.payload;
            })
            .addCase(deleteSchoolClass.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.schoolClasses.filter(at => at.id !== id);
                state.schoolClasses = accs;
            })
            .addCase(deleteSchoolClass.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllSchoolClasses = (state) => state.schoolClasses.schoolClasses;
export const getSchoolClassesStatus = (state) => state.schoolClasses.status;
export const getSchoolClassesError = (state) => state.schoolClasses.error;

export const selectSchoolClassById = (state, aId) =>
    state.schoolClasses.schoolClasses.find(a => a.id === aId);
 
export const {schoolClassAdded} = schoolClassesSlice.actions;

export default schoolClassesSlice.reducer