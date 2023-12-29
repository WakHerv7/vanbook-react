import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { reorganizeData } from "../../Helpers";

// const schoolSchoolClassesAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.name.localeCompare(b.name),
//  });
const PATH = '/school_classes'
const schoolClassesAdapter = createEntityAdapter()

const initialState = schoolClassesAdapter.getInitialState()

export const schoolClassesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSchoolClassesByCompanyId: builder.query({
            query: id => `${PATH}/company/${id}`,
            transformResponse: (responseData, error) => {
                const root = reorganizeData(responseData)             
                return schoolClassesAdapter.setAll(initialState, root);
             },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'SchoolClass', id: "LIST" }];
                }                 
                    return [
                    { type: 'SchoolClass', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'SchoolClass', id }))
                ]
            }
        }),
        addNewSchoolClass: builder.mutation({
            query: (initialSchoolClass) => ({
                url: PATH,
                method: 'POST',
                body: initialSchoolClass,
            }),
            invalidatesTags: [
                { type: 'SchoolClass', id: "LIST" }
            ]
        }),
        updateSchoolClass: builder.mutation({
            query: initialSchoolClass => ({
                url: `${PATH}/${initialSchoolClass.id}`,
                method: 'PUT',
                body: initialSchoolClass
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolClass', id: arg.id }
            ]
        }),
        deleteSchoolClass: builder.mutation({
            query: ({ id }) => ({
                url: `${PATH}/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolClass', id: arg.id }
            ]
        }),
    })
})


export const {
    useGetSchoolClassesByCompanyIdQuery,
    useAddNewSchoolClassMutation,
    useUpdateSchoolClassMutation,
    useDeleteSchoolClassMutation
} = schoolClassesApiSlice