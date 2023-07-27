import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";
import { IChat } from "../global/types";

interface IFoundUsers{
    id: number
    foundUsers: (IUser | IChat)[]
}

const foundUsersSlice = createSlice({
    name: "found users",
    initialState: {
        id: -1,
        foundUsers: []
    } as IFoundUsers,
    reducers: {
        setId: (state, {payload}) => {
            state.id = payload
        },
        setFoundUsers: (state, {payload}) => {
            state.foundUsers = payload
        }
    }
})
export const { setId, setFoundUsers } = foundUsersSlice.actions
export default foundUsersSlice
