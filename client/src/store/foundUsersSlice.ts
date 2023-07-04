import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";

interface IFoundUsers{
    foundUsers: IUser[]
}

const foundUsersSlice = createSlice({
    name: "found users",
    initialState: {
        foundUsers: []
    } as IFoundUsers,
    reducers: {
        setFoundUsers: (state, {payload}) => {
            state.foundUsers = payload
        }
    }
})
export const { setFoundUsers } = foundUsersSlice.actions
export default foundUsersSlice
