import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";

export interface ISelectedChat{
    id: number
    title: string
    users: IUser[]
    messages: {from: string, text: string, chatId: number, senderId: number}[]
}

const selectedChatSlice = createSlice({
    name: "selected chat",
    initialState: {
        id: -1,
        title: "",
        users: [],
        messages: []
    } as ISelectedChat,
    reducers: {
        setId: (state, {payload}) => {
            state.id = payload
        },
        setUsers: (state, {payload}) => {
            state.users = payload
        },
        setTitle: (state, {payload}) => {
            state.title = payload
        },
        setMessages: (state, {payload}) => {
            state.messages.push(payload)
        },
        clearMessages: (state) => {
            state.messages = []
        }
    }
})
export const { setId, setUsers, setTitle, setMessages, clearMessages } = selectedChatSlice.actions
export default selectedChatSlice
