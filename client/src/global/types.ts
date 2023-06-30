export interface IMessage{
    text: string,
    sender: IUser
    time: string
}
export interface ISelectedChat{
    id: number
    title: string
    users: IUser[]
    messages: IMessage[]
}
export interface IUser{
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    chats: {id: number, name: string, connectedUsers: IUser[]}[]
}
