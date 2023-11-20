import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: userDetails => ({
                url: '/auth/register/',
                method: 'POST',
                body: { ...userDetails }
            })
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/auth/logout/',
                method: 'POST',
                body: {}
            })
        }),
    })
 })
 
 export const {
    useLoginMutation,
    useRegisterMutation,
    useSignoutMutation
 } = authApiSlice