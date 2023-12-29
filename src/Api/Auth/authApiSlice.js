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
        submitCompanyData: builder.mutation({
            query: data => ({
                url: `/auth/onboarding/company/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitUserRole: builder.mutation({
            query: data => ({
                url: `/auth/onboarding/role/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitObjective: builder.mutation({
            query: data => ({
                url: `/auth/onboarding/objective/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        
    })
 })
 
 export const {
    useLoginMutation,
    useRegisterMutation,
    useSignoutMutation,
    useSubmitCompanyDataMutation,
    useSubmitUserRoleMutation,
    useSubmitObjectiveMutation
 } = authApiSlice