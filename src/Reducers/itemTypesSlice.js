import { createSlice, /*nanoid,*/ createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/item_types';

const initialState = {
    itemTypes: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchItemTypes = createAsyncThunk('itemTypes/fetchItemTypes', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewItemType = createAsyncThunk('itemTypes/addNewItemType', async (initialItemType) => {
    try {
        const response = await axios.post(ITEMS_URL, initialItemType)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateItemType = createAsyncThunk('itemTypes/updateItemType', async (initialItemType) => {
    const { id } = initialItemType;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialItemType)
        return response.data
    } catch (err) {
        //return err.message;
        return initialItemType; // only for testing Redux!
    }
})

export const deleteItemType = createAsyncThunk('itemTypes/deleteItemType', async (initialItemType) => {
    const { id } = initialItemType;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialItemType;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const itemTypesSlice = createSlice({
    name:'itemTypes',
    initialState,
    reducers: {
        itemTypeAdded: {
            reducer(state, action) {
                state.itemTypes.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItemTypes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchItemTypes.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched itemTypes to the array
                
                state.itemTypes = action.payload
            })
            .addCase(fetchItemTypes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItemType.fulfilled, (state, action) => {                
                state.itemTypes.push(action.payload)
            })
            .addCase(updateItemType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.itemTypes.findIndex(a => a.id === id);
                state.itemTypes[updatedIndex] = action.payload;
            })
            .addCase(deleteItemType.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.itemTypes.filter(at => at.id !== id);
                state.itemTypes = accs;
            })
            .addCase(deleteItemType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllItemTypes = (state) => state.itemTypes.itemTypes;
export const getItemTypesStatus = (state) => state.itemTypes.status;
export const getItemTypesError = (state) => state.itemTypes.error;

export const selectItemTypeById = (state, aId) =>
    state.itemTypes.itemTypes.find(a => a.id === aId);
 
export const {itemTypeAdded} = itemTypesSlice.actions;

export default itemTypesSlice.reducer