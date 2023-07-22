import { useDispatch } from "react-redux"
import { setTitle, setId as setChatId, setMessages, setUsers } from "../store/selectedChatSlice"
import { changeActiveElementColour, displayLogo } from "./Chat"
import { setId } from "../store/foundUsersSlice"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect } from "react"
import { IChat } from "../global/types"

interface IFoundUser{
    id: number
    title: string
    username: string
}

const FoundUser = ({id, title, username} : IFoundUser) => {
    const activeStateColour = "bg-blue-200"
    const hoveredStateColour = "bg-stone-200"
    const dispatch = useDispatch()
    const { chats } = useSelector((state : RootState) => state.user)
    const { id: chatId } = useSelector((state: RootState) => state.selectedChat)
    let chatsWithUser : IChat[] = []
    const handleClick = () => {
        chatsWithUser = chats.filter(chat => chat.connectedUsers.length === 1 && chat.connectedUsers[0].id === id)
        if(chatsWithUser.length === 0){
            dispatch(setMessages([]))
            dispatch(setChatId(id))
            dispatch(setId(id))
        }
        else{
            dispatch(setMessages(JSON.parse(sessionStorage.getItem(`chat-${chatsWithUser[0].id}`)!)))
            dispatch(setChatId(chatsWithUser[0].id))
            dispatch(setUsers(chatsWithUser[0].connectedUsers))
        }
        dispatch(setTitle(title))
        document.getElementsByClassName(activeStateColour)[0]?.classList.remove(activeStateColour)
        changeActiveElementColour(`${id}`)
    }
    const handleMouseOver = () => {
        const hoveredElement = document.getElementById(id.toString());
        if(!hoveredElement?.classList.contains(activeStateColour)){
          hoveredElement?.classList.add(hoveredStateColour)
        }
    }
    const handleMouseLeave = () => {
        document.getElementById(id.toString())?.classList.remove(hoveredStateColour);
    }
    useEffect(() => {
        chatsWithUser = chats.filter(chat => chat.connectedUsers.length === 1 && chat.connectedUsers[0].id === id)
        if(chatsWithUser[0]?.id === chatId){
            changeActiveElementColour(`${id}`)
        }
    }, [])
    return (
        <article id={id.toString()} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex min-h-[4rem] items-center px-4 py-2 cursor-pointer gap-4">
            <div className="min-w-[3rem] min-h-[3rem] flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 font-medium rounded-3xl text-xl select-none">{displayLogo(title)}</div>
            <div className="flex flex-col gap-1 col-start-1 col-span-6">
                <p className="font-bold truncate">{title}</p>
                <p className="text-blue-400 sender text-sm">@{username}</p>
            </div>
        </article>
    )
}

export default FoundUser
