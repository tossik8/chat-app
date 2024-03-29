import { useDispatch } from "react-redux"
import { setId, setMessages, setTitle, setUsers } from "../store/selectedChatSlice"
import { IUser } from "../store/userSlice"
import { useEffect } from "react"
import { IMessage } from "../global/types"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface IChat{
  id: number
  title: string
  connectedUsers: IUser[]
  messages: IMessage[]
  width: number
  setIsChatWindow: (isChatWindow: boolean) => void
}

const activeStateColour = "bg-blue-200"
const hoveredStateColour = "bg-stone-200"

export function changeActiveElementColour(id: string){
  const element = document.getElementById(id) as HTMLElement
  element?.classList.remove(hoveredStateColour)
  element?.classList.add(activeStateColour)
}

const Chat = ({id, title, connectedUsers, messages, setIsChatWindow, width} : IChat) => {
  const dispatch = useDispatch()
  const { id : chatId } = useSelector((state: RootState) => state.selectedChat)
  const handleClick = () => {
    setIsChatWindow(true)
    dispatch(setMessages(messages))
    dispatch(setId(id))
    dispatch(setUsers(connectedUsers))
    dispatch(setTitle(title))
    document.getElementsByClassName(activeStateColour)[0]?.classList.remove(activeStateColour)
    changeActiveElementColour(`chat-${id}`)
    const element = document.getElementById(`chat-${id}`) as HTMLElement
    element.getElementsByClassName("unread-messages-count")[0]?.setAttribute("data-value", "0")
    element.getElementsByClassName("unread-messages-count")[0].textContent = ""
  }
  const handleMouseOver = () => {
    const hoveredElement = document.getElementById(`chat-${id}`);
    if(!hoveredElement?.classList.contains(activeStateColour)){
      hoveredElement?.classList.add(hoveredStateColour)
    }
  }

  const handleMouseLeave = () => {
    document.getElementById(`chat-${id}`)?.classList.remove(hoveredStateColour);
  }

  useEffect(() => {
    const article = document.getElementById(`chat-${id}`) as HTMLElement
    if(messages.length !== 0){
      displayChatInfo(article, messages.at(-1)!.time, messages.at(-1)!.sender, messages.at(-1)!.text)
    }
    if(id === chatId && width >= 768){
      changeActiveElementColour(`chat-${id}`)
    }
  }, [])


  function displayChatInfo(article: HTMLElement, time: string, sender: IUser, text: string){
    article.getElementsByClassName("time")[0]!.textContent = time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")
    article.getElementsByClassName("sender")[0]!.textContent = `${sender.name} ${sender.surname}:`
    article.getElementsByClassName("message")[0]!.textContent = text
  }

  return (
    <article id={`chat-${id}`} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex min-h-[4rem] items-center px-4 py-2 cursor-pointer gap-4">
      <div className="min-w-[3rem] min-h-[3rem] flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 font-medium rounded-3xl text-xl select-none">{displayLogo(title)}</div>
      <div className="grid grid-cols-7 w-full">
        <div className="flex flex-col gap-1 col-start-1 col-span-6">
          <p className="font-bold truncate">{title}</p>
          <div className="whitespace-nowrap flex gap-1">
            <p className="text-blue-400 sender text-sm"></p>
            <p className="truncate message text-sm"></p>
          </div>
        </div>
        <div className="flex flex-col text-sm items-end justify-between">
          <p className="time"></p>
          <div className="bg-violet-200 min-w-fit px-[0.3rem] rounded-xl text-center unread-messages-count" data-value={0}></div>
        </div>
      </div>
    </article>
  )
}
export function displayLogo(title: string){
  const [first, second] = title.split(" ")
  return first && second ? first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase() : first.charAt(0).toUpperCase()
}

export default Chat
