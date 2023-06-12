import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";
export interface ISelectedChat{
    title: string
    users: IUser[]
}

const selectedChatSlice = createSlice({
    name: "selected chat",
    initialState: {
        title: "",
        users: []
    } as ISelectedChat,
    reducers: {
        setUsers: (state, {payload}) => {
            state.users = payload
        },
        setTitle: (state, {payload}) => {
            state.title = payload
        }
    }
})
export const { setUsers, setTitle } = selectedChatSlice.actions
export default selectedChatSlice
