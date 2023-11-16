import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACCOUNT_TYPES_URL = process.env.REACT_APP_API_URL+'/account_types';

// const accountTypesList = [
//     { name:"Income", category:1 },
//     { name:"Expenses", category:1 },
//     { name:"Current Asset", category:2 },
//     { name:"Fixed Asset", category:2 },
//     { name:"Current Liabilities", category:2 },
//     { name:"Long Term Liabilities", category:2 },
//     { name:"Equity", category:2 },
//     { name:"Item Receivable", category:2 },
//     { name:"Item Payable", category:2 },
// ];

const initialState = {
    accountTypes: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// *******************************************************************************
// *******************************************************************************
export const fetchAccountTypes = createAsyncThunk('account_types/fetchAccountTypes', async () => {
    try {
        const response = await axios.get(ACCOUNT_TYPES_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewAccountType = createAsyncThunk('account_types/addNewAccountType', async (initialAccountType) => {
    try {
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
// *******************************************************************************


const accountTypesSlice = createSlice({
    name:'accounttypes',
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
                // Add any fetched items to the array
                state.accountTypes = action.payload                
                //............
                // if (action.payload.length == 0) {
                //     accountTypesList.map((accType) => {
                //         accountTypesSlice.extraReducers.builder.addNewAccountType(accType);
                //         // accountTypesSlice.extraReducers.addNewAccountType(state, { type: 'addNewAccountType', payload: accType })
                //     })
                //     accountTypesSlice.extraReducers.builder.fetchAccountTypes();
                // } else {
                //     // Add any fetched items to the array
                //     state.accountTypes = action.payload
                // }
                
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

export const selectAllAccTypes = (state) => state.accounttypes.accountTypes;
export const getAccTypesStatus = (state) => state.accounttypes.status;
export const getAccTypesError = (state) => state.accounttypes.error;

export const selectAccTypeById = (state, atId) =>
    state.accounttypes.accountTypes.find(at => at.id === atId);
 
export const {accountAdded} = accountTypesSlice.actions;

export default accountTypesSlice.reducer