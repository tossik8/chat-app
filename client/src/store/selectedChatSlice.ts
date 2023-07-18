import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../global/types";
import { IUser } from "./userSlice";

interface ISelectedChat{
    id: number
    title: string
    users: IUser[]
    messages: IMessage[]
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
            if(Array.isArray(payload)){
                state.messages = payload
            }
            else{
                state.messages.push(payload)
            }
        }
    }
})
export const { setId, setUsers, setTitle, setMessages } = selectedChatSlice.actions
export default selectedChatSlice
