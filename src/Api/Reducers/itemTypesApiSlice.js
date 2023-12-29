import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const PATH = '/item_types'
const itemtypesAdapter = createEntityAdapter()

const initialState = itemtypesAdapter.getInitialState()

export const itemTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItemTypesByCompanyId: builder.query({
            query: id => `${PATH}/company/${id}`,
            transformResponse: (responseData, error) => {
                return itemtypesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'ItemType', id: "LIST" }];
                }                 
                    return [
                    { type: 'ItemType', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'ItemType', id }))
                ]
            }
        }),
        addNewItemType: builder.mutation({
            query: (initialItemType) => ({
                url: PATH,
                method: 'POST',
                body: initialItemType,
            }),
            invalidatesTags: [
                { type: 'ItemType', id: "LIST" }
            ]
        }),
        updateItemType: builder.mutation({
            query: initialItemType => ({
                url: `${PATH}/${initialItemType.id}`,
                method: 'PUT',
                body: initialItemType
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ItemType', id: arg.id }
            ]
        }),
        deleteItemType: builder.mutation({
            query: ({ id }) => ({
                url: `${PATH}/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ItemType', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetItemTypesByCompanyIdQuery,
    useAddNewItemTypeMutation,
    useUpdateItemTypeMutation,
    useDeleteItemTypeMutation
} = itemTypesApiSlice