import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ACCOUNTS_URL = process.env.REACT_APP_API_URL+'/accounts';

const initialState = {
    accounts: [],
    accountsByType: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
    try {
        const response = await axios.get(ACCOUNTS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const fetchAccountsByType = createAsyncThunk('accounts/fetchAccountsByType', async (id) => {
    // const { id } = initialAccount;
    try {
        const response = await axios.get(`${ACCOUNTS_URL}/typenb/${id}`)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewAccount = createAsyncThunk('accounts/addNewAccount', async (initialAccount) => {
    try {
        const response = await axios.post(ACCOUNTS_URL, initialAccount)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (initialAccount) => {
    const { id } = initialAccount;
    try {
        const response = await axios.put(`${ACCOUNTS_URL}/${id}`, initialAccount)
        return response.data
    } catch (err) {
        //return err.message;
        return initialAccount; // only for testing Redux!
    }
})

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (initialAccount) => {
    const { id } = initialAccount;
    try {
        const response = await axios.delete(`${ACCOUNTS_URL}/${id}`)
        if (response?.status === 200) return initialAccount;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const accountsSlice = createSlice({
    name:'accounts',
    initialState,
    reducers: {
        accountAdded: {
            reducer(state, action) {
                state.accounts.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccounts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched items to the array
                
                state.accounts = action.payload
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchAccountsByType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccountsByType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accountsByType = action.payload
            })
            .addCase(fetchAccountsByType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAccount.fulfilled, (state, action) => {                
                state.accounts.push(action.payload)
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.accounts.findIndex(a => a.id == id);
                state.accounts[updatedIndex] = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.accounts.filter(at => at.id !== id);
                state.accounts = accs;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllAccounts = (state) => state.accounts.accounts;
export const selectAllTypedAccounts = (state) => state.accounts.accountsByType;
export const getAccountsStatus = (state) => state.accounts.status;
export const getAccountsError = (state) => state.accounts.error;

export const selectAccountById = (state, aId) =>
    state.accounts.accounts.find(a => a.id === aId);
 
export const {accountAdded} = accountsSlice.actions;

export default accountsSlice.reducer