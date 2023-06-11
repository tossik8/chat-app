import { createSlice } from "@reduxjs/toolkit";

export interface UserState{
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    chats: {id: number, name: string}[],
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: -1,
        name: "",
        surname: "",
        username: "",
        email: "",
        chats: [],
    } as UserState,
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
        },
        setChats: (state, {payload}) => {
            state.chats = payload
        }
    }
})

export const { setId, setName, setSurname, setUsername, setEmail, setChats } = userSlice.actions
export default userSlice
