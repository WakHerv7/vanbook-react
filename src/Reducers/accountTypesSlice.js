import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACCOUNT_TYPES_URL = process.env.REACT_APP_API_URL+'/account_types';

const initialState = {
    accountTypes: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// *******************************************************************************
export const fetchAccountTypes = createAsyncThunk('accounts/fetchAccountTypes', async (props) => {
    const {company_id} = props
    try {
        const response = await axios.get(`${ACCOUNT_TYPES_URL}/company/${company_id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewAccountType = createAsyncThunk('account_types/addNewAccountType', async (initialAccountType) => {
    try {
        console.log("fetchAccountTypes - fetchAccountTypes");
        const response = await axios.post(ACCOUNT_TYPES_URL, initialAccountType)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateAccountType = createAsyncThunk('account_types/updateAccountType', async (initialAccountType) => {
    const { id } = initialAccountType;
    try {
        const response = await axios.put(`${ACCOUNT_TYPES_URL}/${id}`, initialAccountType)
        return response.data
    } catch (err) {
        //return err.message;
        return initialAccountType; // only for testing Redux!
    }
})

export const deleteAccountType = createAsyncThunk('account_types/deleteAccountType', async (initialAccountType) => {
    const { id } = initialAccountType;
    try {
        const response = await axios.delete(`${ACCOUNT_TYPES_URL}/${id}`)
        if (response?.status === 200) return initialAccountType;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************

const accountTypesSlice = createSlice({
    name:'acctypes',
    initialState,
    reducers: {
        accountTypeAdded: {
            reducer(state, action) {
                state.accountTypes.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccountTypes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccountTypes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accountTypes = action.payload
            })
            .addCase(fetchAccountTypes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAccountType.fulfilled, (state, action) => {                
                state.accountTypes.push(action.payload)
            })
            .addCase(updateAccountType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.accountTypes.findIndex(at => at.id == id);
                state.accountTypes[updatedIndex] = action.payload;
                // const accTypes = state.accountTypes.filter(at => at.id !== id);
                // state.accountTypes = [...accTypes, action.payload];
            })
            .addCase(deleteAccountType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accTypes = state.accountTypes.filter(at => at.id !== id);
                state.accountTypes = accTypes;
            })
            .addCase(deleteAccountType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllAccTypes = (state) => state.acctypes.accountTypes;
export const getAccTypesStatus = (state) => state.acctypes.status;
export const getAccTypesError = (state) => state.acctypes.error;

export const selectAccTypeById = (state, atId) =>
    state.acctypes.accountTypes.find(at => at.id === atId);
 
export const {accountAdded} = accountTypesSlice.actions;

export default accountTypesSlice.reducer