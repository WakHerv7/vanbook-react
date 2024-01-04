import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { reorganizeData } from "../../Helpers";

// const schoolSchoolLevelsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.name.localeCompare(b.name),
//  });
const PATH = '/school_levels'
const schoolLevelsAdapter = createEntityAdapter()

const initialState = schoolLevelsAdapter.getInitialState()

export const schoolLevelsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSchoolLevelsByCompanyId: builder.query({
            query: id => `${PATH}/company/${id}`,
            transformResponse: (responseData, error) => {
                const root = reorganizeData(responseData)             
                return schoolLevelsAdapter.setAll(initialState, root);
             },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [{ type: 'SchoolLevel', id: "LIST" }];
                }                 
                    return [
                    { type: 'SchoolLevel', id: "LIST" },
                    ...result.ids.map(id => ({ type: 'SchoolLevel', id }))
                ]
            }
        }),
        addNewSchoolLevel: builder.mutation({
            query: (initialSchoolLevel) => ({
                url: PATH,
                method: 'POST',
                body: initialSchoolLevel,
            }),
            invalidatesTags: [
                { type: 'SchoolLevel', id: "LIST" }
            ]
        }),
        updateSchoolLevel: builder.mutation({
            query: initialSchoolLevel => ({
                url: `${PATH}/${initialSchoolLevel.id}`,
                method: 'PUT',
                body: initialSchoolLevel
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolLevel', id: arg.id }
            ]
        }),
        deleteSchoolLevel: builder.mutation({
            query: ({ id }) => ({
                url: `${PATH}/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'SchoolLevel', id: arg.id }
            ]
        }),
    })
})


export const {
    useGetSchoolLevelsByCompanyIdQuery,
    useAddNewSchoolLevelMutation,
    useUpdateSchoolLevelMutation,
    useDeleteSchoolLevelMutation
} = schoolLevelsApiSlice