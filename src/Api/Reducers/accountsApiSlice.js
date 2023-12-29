import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { reorganizeData } from "../../Helpers";

// const accountsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.name.localeCompare(b.name),
//  });

const accountsAdapter = createEntityAdapter()

const initialState = accountsAdapter.getInitialState()

export const accountsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccountsByCompanyId: builder.query({
            query: id => `/accounts/company/${id}`,
            transformResponse: (responseData, error) => {
                const root = reorganizeData(responseData)             
                return accountsAdapter.setAll(initialState, root);
             },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'Account', id: "LIST" }];
                }                 
                    return [
                    { type: 'Account', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'Account', id }))
                ]
            }
        }),
        addNewAccount: builder.mutation({
            query: (initialAccount) => ({
                url: '/accounts',
                method: 'POST',
                body: initialAccount,
            }),
            invalidatesTags: [
                { type: 'Account', id: "LIST" }
            ]
        }),
        updateAccount: builder.mutation({
            query: initialAccount => ({
                url: `/accounts/${initialAccount.id}`,
                method: 'PUT',
                body: initialAccount
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Account', id: arg.id }
            ]
        }),
        deleteAccount: builder.mutation({
            query: ({ id }) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Account', id: arg.id }
            ]
        }),
    })
})


export const {
    useGetAccountsByCompanyIdQuery,
    useAddNewAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation
} = accountsApiSlice