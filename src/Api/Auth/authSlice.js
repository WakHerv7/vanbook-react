import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, token: null, welcome:null },
    reducers: {
        setCredentials: (state, action) => {
            const { access_token, welcome } = action.payload
            // state.email = email
            state.token = access_token
            state.welcome = welcome
        },
        setWelcome: (state, action) => {
            const { welcome } = action.payload
            state.welcome = welcome
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
 
 export const { setCredentials, setWelcome, logOut, registerUser } = authSlice.actions
 
 export default authSlice.reducer
 
 export const selectCurrentUser = (state) => state.auth.email
 export const selectCurrentToken = (state) => state.auth.token
 export const selectWelcome = (state) => state.auth.welcome