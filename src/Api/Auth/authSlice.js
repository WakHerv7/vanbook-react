import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {        
        token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { access_token } = action.payload
            // state.email = email
            state.token = access_token
        },
        logOut: (state, action) => {
            // state.user = null
            state.token = null
        },
        registerUser: (state, action) => {
            const { email, access_token } = action.payload
            // state.email = email4
            state.token = access_token
        }
    },
 })
 
 export const { setCredentials, logOut, registerUser } = authSlice.actions
 
 export default authSlice.reducer
 
 export const selectCurrentUser = (state) => state.auth.email
 export const selectCurrentToken = (state) => state.auth.token
