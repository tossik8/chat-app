import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: undefined,
        name: undefined,
        surname: undefined,
        username: undefined,
        email: undefined
    },
    reducers: {
        setId: (state, {payload}) => {
            state.id = payload
        },
        setName: (state, {payload}) => {
            state.name = payload
        },
        setSurname: (state, {payload}) => {
            state.surname = payload
        },
        setUsername: (state, {payload}) => {
            state.username = payload
        },
        setEmail: (state, {payload}) => {
            state.email = payload
        }
    }
})

export const { setId, setName, setSurname, setUsername, setEmail } = userSlice.actions
export default userSlice
