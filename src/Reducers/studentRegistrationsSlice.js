import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/school_student_registrations';

const initialState = {
    studentRegistrations: [],
    receiptId: null,
    addedStatus: 'idle',
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchStudentRegistrations = createAsyncThunk('studentRegistrations/fetchStudentRegistrations', async () => {
    try {
        const response = await axios.get(ITEMS_URL+'/registered_students/')
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchStudentRegistrationById = createAsyncThunk('studentRegistrations/fetchStudentRegistrationById', async (initialStudentRegistration) => {
    const { id } = initialStudentRegistration;
    try {
        const response = await axios.get(`${ITEMS_URL}/registered_students/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewStudentRegistration = createAsyncThunk('studentRegistrations/addNewStudentRegistration', async (initialStudentRegistration) => {
    try {
        const response = await axios.post(`${ITEMS_URL}`, initialStudentRegistration)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateStudentRegistration = createAsyncThunk('studentRegistrations/updateStudentRegistration', async (initialStudentRegistration) => {
    const { id } = initialStudentRegistration;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialStudentRegistration)
        return response.data
    } catch (err) {
        //return err.message;
        return initialStudentRegistration; // only for testing Redux!
    }
})

export const deleteStudentRegistration = createAsyncThunk('studentRegistrations/deleteStudentRegistration', async (initialStudentRegistration) => {
    const { id } = initialStudentRegistration;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialStudentRegistration;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const studentRegistrationsSlice = createSlice({
    name:'studentRegistrations',
    initialState,
    reducers: {
        studentRegistrationAdded: {
            reducer(state, action) {
                state.studentRegistrations.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStudentRegistrations.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchStudentRegistrations.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched studentRegistrations to the array                
                state.studentRegistrations = action.payload
            })
            .addCase(fetchStudentRegistrations.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchStudentRegistrationById.fulfilled, (state, action) => {                
                state.status = 'succeeded'
                // console.log("action.payload: ", action)
                state.studentRegistrations = action.payload
            })
            .addCase(addNewStudentRegistration.fulfilled, (state, action) => {                
                state.studentRegistrations.push(action.payload.one_registration)
                state.receiptId = action.payload.receipt_id
                state.addedStatus = 'succeeded'
            })
            .addCase(updateStudentRegistration.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.studentRegistrations.findIndex(a => a.id == id);
                state.studentRegistrations[updatedIndex] = action.payload;
            })
            .addCase(deleteStudentRegistration.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.studentRegistrations.filter(at => at.id !== id);
                state.studentRegistrations = accs;
            })
            .addCase(deleteStudentRegistration.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllStudentRegistrations = (state) => state.studentRegistrations.studentRegistrations;
export const getStudentRegistrationsStatus = (state) => state.studentRegistrations.status;
export const getAddedStudentRegistrationStatus = (state) => state.studentRegistrations.addedStatus;
export const getStudentRegistrationReceiptId = (state) => state.studentRegistrations.receiptId;
export const getStudentRegistrationsError = (state) => state.studentRegistrations.error;

export const selectStudentRegistrationById = (state, aId) =>
    state.studentRegistrations.studentRegistrations.find(a => a.id === aId);

export const selectStudentRegistrationById2 = (state, aId) => {
    state.studentRegistrations.studentRegistrations.find(a => a.id === aId);
}

export const {studentRegistrationAdded} = studentRegistrationsSlice.actions;

export default studentRegistrationsSlice.reducer
