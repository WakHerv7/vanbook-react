import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users/',
            transformResponse: (responseData, error) => {
                console.log('responseData:', responseData);
                console.log('error:', error);
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'User', id: "LIST" }];
                }                 
                    return [
                    { type: 'User', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'User', id }))
                ]
            }
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice