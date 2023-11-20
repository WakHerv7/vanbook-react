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

                // if (error) {
                //     // Handle error, possibly return default state or an empty array
                //     return initialState; // or return [];
                // }
                // if (responseData) {
                //     return usersAdapter.setAll(initialState, responseData);
                // } else {
                //     // Handle the case where responseData is null or undefined
                //     return initialState; // or return [];
                // }

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