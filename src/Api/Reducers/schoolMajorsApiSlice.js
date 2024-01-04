import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { reorganizeData } from "../../Helpers";

// const schoolSchoolMajorsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.name.localeCompare(b.name),
//  });
const PATH = '/school_majors'
const schoolMajorsAdapter = createEntityAdapter()

const initialState = schoolMajorsAdapter.getInitialState()

export const schoolMajorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSchoolMajorsByCompanyId: builder.query({
            query: id => `${PATH}/company/${id}`,
            transformResponse: (responseData, error) => {
                const root = reorganizeData(responseData)             
                return schoolMajorsAdapter.setAll(initialState, root);
             },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'SchoolMajor', id: "LIST" }];
                }                 
                    return [
                    { type: 'SchoolMajor', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'SchoolMajor', id }))
                ]
            }
        }),
        addNewSchoolMajor: builder.mutation({
            query: (initialSchoolMajor) => ({
                url: PATH,
                method: 'POST',
                body: initialSchoolMajor,
            }),
            invalidatesTags: [
                { type: 'SchoolMajor', id: "LIST" }
            ]
        }),
        updateSchoolMajor: builder.mutation({
            query: initialSchoolMajor => ({
                url: `${PATH}/${initialSchoolMajor.id}`,
                method: 'PUT',
                body: initialSchoolMajor
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolMajor', id: arg.id }
            ]
        }),
        deleteSchoolMajor: builder.mutation({
            query: ({ id }) => ({
                url: `${PATH}/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolMajor', id: arg.id }
            ]
        }),
    })
})


export const {
    useGetSchoolMajorsByCompanyIdQuery,
    useAddNewSchoolMajorMutation,
    useUpdateSchoolMajorMutation,
    useDeleteSchoolMajorMutation
} = schoolMajorsApiSlice