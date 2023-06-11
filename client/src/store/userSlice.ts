import { createSlice } from "@reduxjs/toolkit";

export interface IUser{
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    chats: {id: number, name: string}[],
    connectedUsers: IUser[]
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
        connectedUsers: []
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
        setConnectedUsers: (state, {payload}) => {
            state.connectedUsers = payload
        }
    }
})

export const { setId, setName, setSurname, setUsername, setEmail, setChats, setConnectedUsers } = userSlice.actions
export default userSlice
