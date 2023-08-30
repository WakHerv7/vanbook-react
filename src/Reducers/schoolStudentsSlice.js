import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/school_students';

const initialState = {
    schoolStudents: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchSchoolStudents = createAsyncThunk('schoolStudents/fetchSchoolStudents', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewSchoolStudent = createAsyncThunk('schoolStudents/addNewSchoolStudent', async (initialSchoolStudent) => {
    try {
        const response = await axios.post(ITEMS_URL, initialSchoolStudent)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateSchoolStudent = createAsyncThunk('schoolStudents/updateSchoolStudent', async (initialSchoolStudent) => {
    const { id } = initialSchoolStudent;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialSchoolStudent)
        return response.data
    } catch (err) {
        //return err.message;
        return initialSchoolStudent; // only for testing Redux!
    }
})

export const deleteSchoolStudent = createAsyncThunk('schoolStudents/deleteSchoolStudent', async (initialSchoolStudent) => {
    const { id } = initialSchoolStudent;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialSchoolStudent;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const schoolStudentsSlice = createSlice({
    name:'schoolStudents',
    initialState,
    reducers: {
        schoolStudentAdded: {
            reducer(state, action) {
                state.schoolStudents.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSchoolStudents.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSchoolStudents.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched schoolStudents to the array
                
                state.schoolStudents = action.payload
            })
            .addCase(fetchSchoolStudents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewSchoolStudent.fulfilled, (state, action) => {                
                state.schoolStudents.push(action.payload)
            })
            .addCase(updateSchoolStudent.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.schoolStudents.findIndex(a => a.id == id);
                state.schoolStudents[updatedIndex] = action.payload;
            })
            .addCase(deleteSchoolStudent.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.schoolStudents.filter(at => at.id !== id);
                state.schoolStudents = accs;
            })
            .addCase(deleteSchoolStudent.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllSchoolStudents = (state) => state.schoolStudents.schoolStudents;
export const getSchoolStudentsStatus = (state) => state.schoolStudents.status;
export const getSchoolStudentsError = (state) => state.schoolStudents.error;

export const selectSchoolStudentById = (state, aId) =>
    state.schoolStudents.schoolStudents.find(a => a.id === aId);
 
export const {schoolStudentAdded} = schoolStudentsSlice.actions;

export default schoolStudentsSlice.reducer
