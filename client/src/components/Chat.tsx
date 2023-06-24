import { useDispatch } from "react-redux"
import { IUser } from "../store/userSlice"
import { setId, setTitle, setUsers } from "../store/selectedChatSlice"

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
    dispatch(setId(id))
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

  function displayLogo(title: string){
    const [first, second] = title.split(" ")
    return first && second ? first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase() : first.charAt(0).toUpperCase()
  }

  return (
    <article id={id.toString()} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex items-center justify-between px-4 py-2 cursor-pointer">
      <div className="flex gap-4">
        <div className="w-12 flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 font-medium rounded-3xl text-xl select-none">{displayLogo(title)}</div>
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
