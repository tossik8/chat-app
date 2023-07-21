import { useDispatch } from "react-redux"
import { setTitle, setId as setChatId, setMessages } from "../store/selectedChatSlice"
import { displayLogo } from "./Chat"
import { setId } from "../store/foundUsersSlice"

interface IFoundUser{
    id: number
    title: string
    username: string
}

const FoundUser = ({id, title, username} : IFoundUser) => {
    const activeStateColour = "bg-blue-200"
    const hoveredStateColour = "bg-stone-200"
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setMessages([]))
        dispatch(setChatId(id))
        dispatch(setId(id))
        dispatch(setTitle(title))
        const element = document.getElementById(id.toString()) as HTMLElement
        document.getElementsByClassName(activeStateColour)[0]?.classList.remove(activeStateColour)
        element?.classList.remove(hoveredStateColour)
        element?.classList.add(activeStateColour)
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
