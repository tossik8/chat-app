import { useDispatch } from "react-redux"
import { IUser } from "../store/userSlice"
import { setTitle, setUsers } from "../store/selectedChatSlice"

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
    dispatch(setUsers(connectedUsers))
    dispatch(setTitle(title))
    const element = document.getElementById(id.toString())
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
    <article id={id.toString()} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex items-center justify-between px-4 py-2 cursor-pointer">
      <div className="flex gap-4">
        <img src="/image-emily.jpg" alt="Chat image." className="w-12 rounded-3xl"/>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm"><span className="text-blue-400">Mike: </span> Last Message</p>
        </div>
      </div>
      <div className="flex flex-col items-end text-sm gap-1">
        <p>15:20</p>
        <div className="bg-stone-400 min-w-fit px-[0.3rem] rounded-xl text-center">9</div>
      </div>
    </article>
  )
}

export default Chat
