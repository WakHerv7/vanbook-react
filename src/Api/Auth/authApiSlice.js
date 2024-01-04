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
                url: `/onboarding/company/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitUserRole: builder.mutation({
            query: data => ({
                url: `/onboarding/role/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitObjective: builder.mutation({
            query: data => ({
                url: `/onboarding/objective/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitSchoolData: builder.mutation({
            query: data => ({
                url: `/onboarding/school-data/${data.id}`,
                method: 'PUT',
                body: { ...data }
            })
        }),
        submitSchoolFees: builder.mutation({
            query: data => ({
                url: `/onboarding/school-fees/${data.id}`,
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
    useSubmitObjectiveMutation,
    useSubmitSchoolDataMutation,
    useSubmitSchoolFeesMutation
 } = authApiSlice