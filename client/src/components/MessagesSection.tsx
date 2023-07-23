import { displayLogo } from "./Chat"
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useEffect } from "react"


const MessagesSection = () => {
    const { id: senderId } = useSelector((state: RootState) => state.user)
    const { messages } = useSelector((state: RootState) => state.selectedChat)

    useEffect(() => {
        document.getElementById("messages")?.scrollTo({top: document.getElementById("messages")?.scrollHeight, left: 0, behavior: "smooth"})
    }, [messages])

    return (
        <ul id="messages" className="px-4 h-[88vh] max-h-[1249px] pb-3 overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">{messages.map((message, i) => (
            <li className="grid grid-cols-[32px_50%] items-end gap-2" key={i}>
                <div className="h-8 w-8 rounded-3xl flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 select-none text-sm font-medium">{displayLogo(message.sender.name + " " + message.sender.surname)}</div>
            {message.sender.id === senderId?
                <div className="p-1 rounded-md bg-blue-200 mt-3 relative pr-9 w-fit">
                    <p className="break-all whitespace-pre-wrap mr-1">{message.text}</p>
                    <span className="text-xs select-none text-neutral-500 absolute bottom-0 right-1">{message.time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")}</span>
                </div>
                :
                <div className="p-1 rounded-md bg-white mt-3 relative pr-9 w-fit">
                    <p className="break-all whitespace-pre-wrap mr-1">{message.text}</p>
                    <span className="text-xs select-none text-neutral-500 absolute bottom-0 right-1">{message.time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")}</span>
                </div>
                }
            </li>))}
        </ul>
    )
}

export default MessagesSection
