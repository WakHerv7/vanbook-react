import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { reorganizeData } from "../../Helpers";

// const itemsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.name.localeCompare(b.name),
//  });
const PATH = '/items'
const itemsAdapter = createEntityAdapter()
const initialState = itemsAdapter.getInitialState()

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItemsByCompanyId: builder.query({
            query: id => `${PATH}/company/${id}`,
            transformResponse: (responseData, error) => {
                // console.log("responseData : ", responseData);
                const root = reorganizeData(responseData)
                // console.log("root : ", root);
                return itemsAdapter.setAll(initialState, root);
             },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'Item', id: "LIST" }];
                }                 
                    return [
                    { type: 'Item', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'Item', id }))
                ]
            }
        }),
        addNewItem: builder.mutation({
            query: (initialItem) => ({
                url: PATH,
                method: 'POST',
                body: initialItem,
            }),
            invalidatesTags: [
                { type: 'Item', id: "LIST" }
            ]
        }),
        updateItem: builder.mutation({
            query: initialItem => ({
                url: `${PATH}/${initialItem.id}`,
                method: 'PUT',
                body: initialItem
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id }
            ]
        }),
        deleteItem: builder.mutation({
            query: ({ id }) => ({
                url: `${PATH}/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id }
            ]
        }),
    })
})


export const {
    useGetItemsByCompanyIdQuery,
    useAddNewItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation
} = itemsApiSlice