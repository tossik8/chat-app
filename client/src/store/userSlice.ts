import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "../global/types";

export interface IUser{
    id: number
    name: string
    surname: string
    username: string
    email: string
    chats: IChat[]
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: -1,
        name: "",
        surname: "",
        username: "",
        email: "",
        chats: []
    } as IUser,
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
        },
        updateChat: (state, {payload}) => {
            const index = state.chats.findIndex(chat => chat.id === payload.id)
            state.chats[index] = payload.chat
        }
    }
})

export const { setId, setName, setSurname, setUsername, setEmail, setChats, updateChat } = userSlice.actions
export default userSlice
