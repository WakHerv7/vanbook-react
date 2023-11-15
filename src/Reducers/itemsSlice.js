import { createSlice, /*nanoid,*/ createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = process.env.REACT_APP_API_URL+'/items';

const initialState = {
    items: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null  
}


// *******************************************************************************
// *******************************************************************************
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    try {
        const response = await axios.get(ITEMS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewItem = createAsyncThunk('items/addNewItem', async (initialItem) => {
    try {
        const response = await axios.post(ITEMS_URL, initialItem)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const updateItem = createAsyncThunk('items/updateItem', async (initialItem) => {
    const { id } = initialItem;
    try {
        const response = await axios.put(`${ITEMS_URL}/${id}`, initialItem)
        return response.data
    } catch (err) {
        //return err.message;
        return initialItem; // only for testing Redux!
    }
})

export const deleteItem = createAsyncThunk('items/deleteItem', async (initialItem) => {
    const { id } = initialItem;
    try {
        const response = await axios.delete(`${ITEMS_URL}/${id}`)
        if (response?.status === 200) return initialItem;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
// *******************************************************************************
// *******************************************************************************


const itemsSlice = createSlice({
    name:'items',
    initialState,
    reducers: {
        itemAdded: {
            reducer(state, action) {
                state.items.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'                
                // Add any fetched items to the array
                
                state.items = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItem.fulfilled, (state, action) => {                
                state.items.push(action.payload)
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const updatedIndex = state.items.findIndex(a => a.id === id);
                state.items[updatedIndex] = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const accs = state.items.filter(at => at.id !== id);
                state.items = accs;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllItems = (state) => state.items.items;
export const getItemsStatus = (state) => state.items.status;
export const getItemsError = (state) => state.items.error;

export const selectItemById = (state, aId) =>
    state.items.items.find(a => a.id === aId);
 
export const {itemAdded} = itemsSlice.actions;

export default itemsSlice.reducer