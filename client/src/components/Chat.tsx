import { useDispatch } from "react-redux"
import { clearMessages, setId, setMessages, setTitle, setUsers } from "../store/selectedChatSlice"
import { IUser } from "../global/types"

interface IChat{
  id: number,
  title: string,
  connectedUsers: IUser[]
}

const Chat = ({id, title, connectedUsers} : IChat) => {
  const dispatch = useDispatch()
  const activeStateColour = "bg-blue-200"
  const hoveredStateColour = "bg-stone-200"
  const handleClick = () => {
    dispatch(clearMessages())
    dispatch(setMessages(JSON.parse(sessionStorage.getItem(`chat-${id}`)!)))
    dispatch(setId(id))
    dispatch(setUsers(connectedUsers))
    dispatch(setTitle(title))
    const element = document.getElementById(id.toString()) as HTMLElement
    document.getElementsByClassName(activeStateColour)[0]?.classList.remove(activeStateColour)
    element?.classList.remove(hoveredStateColour)
    element?.classList.add(activeStateColour)
    element.getElementsByClassName("unread-messages-count")[0].setAttribute("data-value", "0")
    element.getElementsByClassName("unread-messages-count")[0].textContent = ""
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

  function displayLogo(title: string){
    const [first, second] = title.split(" ")
    return first && second ? first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase() : first.charAt(0).toUpperCase()
  }

  return (
    <article id={id.toString()} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex min-h-[4rem] items-center px-4 py-2 cursor-pointer gap-4">
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
          <div className="bg-stone-400 min-w-fit px-[0.3rem] rounded-xl text-center unread-messages-count" data-value={0}></div>
        </div>
      </div>
    </article>
  )
}

export default Chat
