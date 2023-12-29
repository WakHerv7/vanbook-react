import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const acctypesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
 });
const initialState = acctypesAdapter.getInitialState()

export const accountTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccTypesByCompanyId: builder.query({
            query: id => `/account_types/company/${id}`,
            transformResponse: (responseData, error) => {
                return acctypesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'AccType', id: "LIST" }];
                }                 
                    return [
                    { type: 'AccType', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'AccType', id }))
                ]
            }
            // providesTags: (result, error, arg) => [
            //     ...result.ids.map(id => ({ type: 'AccType', id }))
            // ]
        }),
        addNewAccType: builder.mutation({
            query: (initialAccType) => ({
                url: '/account_types',
                method: 'POST',
                body: initialAccType,
            }),
            invalidatesTags: [
                { type: 'AccType', id: "LIST" }
            ]
        }),
        updateAccType: builder.mutation({
            query: initialAccType => ({
                url: `/account_types/${initialAccType.id}`,
                method: 'PUT',
                body: initialAccType
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AccType', id: arg.id }
            ]
        }),
        deleteAccType: builder.mutation({
            query: ({ id }) => ({
                url: `/account_types/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AccType', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetAccTypesByCompanyIdQuery,
    useAddNewAccTypeMutation,
    useUpdateAccTypeMutation,
    useDeleteAccTypeMutation
} = accountTypesApiSlice