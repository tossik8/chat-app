import { IUser } from "../store/userSlice"

export interface IMessage{
    text: string
    sender: IUser
    time: string
}
export interface IChat{
    id: number
    name: string
    connectedUsers: IUser[]
}
