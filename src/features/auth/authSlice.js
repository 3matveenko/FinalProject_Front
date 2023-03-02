import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { username, token, role } = action.payload
            state.username = username
            state.token = token
            state.role = role
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
        },
        logOut: (state, action) => {
            state.username = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRole = (state) => state.auth.role