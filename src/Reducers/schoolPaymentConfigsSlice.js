import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/school_payment_configs';

const initialState = {
    schoolPaymentConfigs: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchSchoolPaymentConfigs = createAsyncThunk('schoolPaymentConfigs/fetchSchoolPaymentConfigs', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewSchoolPaymentConfig = createAsyncThunk('schoolPaymentConfigs/addNewSchoolPaymentConfig', async (initialSchoolPaymentConfig) => {
    try {
        const response = await axios.post(ITEMS_URL, initialSchoolPaymentConfig)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateSchoolPaymentConfig = createAsyncThunk('schoolPaymentConfigs/updateSchoolPaymentConfig', async (initialSchoolPaymentConfig) => {
    const { id } = initialSchoolPaymentConfig;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialSchoolPaymentConfig)
        return response.data
    } catch (err) {
        //return err.message;
        return initialSchoolPaymentConfig; // only for testing Redux!
    }
})

export const deleteSchoolPaymentConfig = createAsyncThunk('schoolPaymentConfigs/deleteSchoolPaymentConfig', async (initialSchoolPaymentConfig) => {
    const { id } = initialSchoolPaymentConfig;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialSchoolPaymentConfig;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const schoolPaymentConfigsSlice = createSlice({
    name:'schoolPaymentConfigs',
    initialState,
    reducers: {
        schoolPaymentConfigAdded: {
            reducer(state, action) {
                state.schoolPaymentConfigs.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSchoolPaymentConfigs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSchoolPaymentConfigs.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched schoolPaymentConfigs to the array
                
                state.schoolPaymentConfigs = action.payload
            })
            .addCase(fetchSchoolPaymentConfigs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewSchoolPaymentConfig.fulfilled, (state, action) => {                
                state.schoolPaymentConfigs.push(action.payload)
            })
            .addCase(updateSchoolPaymentConfig.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.schoolPaymentConfigs.findIndex(a => a.id == id);
                state.schoolPaymentConfigs[updatedIndex] = action.payload;
            })
            .addCase(deleteSchoolPaymentConfig.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.schoolPaymentConfigs.filter(at => at.id !== id);
                state.schoolPaymentConfigs = accs;
            })
            .addCase(deleteSchoolPaymentConfig.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllSchoolPaymentConfigs = (state) => state.schoolPaymentConfigs.schoolPaymentConfigs;
export const getSchoolPaymentConfigsStatus = (state) => state.schoolPaymentConfigs.status;
export const getSchoolPaymentConfigsError = (state) => state.schoolPaymentConfigs.error;

export const selectSchoolPaymentConfigById = (state, aId) =>
    state.schoolPaymentConfigs.schoolPaymentConfigs.find(a => a.id === aId);
 
export const {schoolPaymentConfigAdded} = schoolPaymentConfigsSlice.actions;

export default schoolPaymentConfigsSlice.reducer