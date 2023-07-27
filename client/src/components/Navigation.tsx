import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef } from "react"
import UserService from "../services/UserService"
import { useDispatch } from "react-redux"
import { setFoundUsers } from "../store/foundUsersSlice"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { compareTwoStrings } from "string-similarity"
import { IUser } from "../store/userSlice"
import { IChat } from "../global/types"

const Navigation = () => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const dispatch = useDispatch()
  const { chats } = useSelector((state: RootState) => state.user)
  const handleChange = () => {
    const entities : (IUser | IChat)[] = []
    chats.forEach(chat => {
      if(compareTwoStrings(chat.name, inputRef.current.value) > 0.3 || (chat.connectedUsers.length === 1 && compareTwoStrings(chat.connectedUsers[0].username, inputRef.current.value) > 0.3)){
        entities.push(chat)
      }
    })
    UserService.getUsers(inputRef.current.value).then(message => {
      entities.push(...message.data.filter((user: IUser) => !entities.find(chat => (chat as IChat).connectedUsers[0].id === user.id)))
      dispatch(setFoundUsers(entities))
    })
    sessionStorage.setItem("input text", inputRef.current.value)
  }
  useEffect(() => {
    inputRef.current.value = sessionStorage.getItem("input text")!
  }, [])

  return (
    <div className="flex items-center gap-4 px-4 h-[5.3vh] max-h-[80px]">
      <button className="hover:scale-125 focus-visible:outline-0 focus-visible:scale-125 transition-{scale} duration-200 ease-in-out"><FontAwesomeIcon icon={faEllipsisVertical} size="xl" color="rgb(168 162 158)" /></button>
      <input ref={inputRef} onChange={handleChange} type="text" name="people-search" className="border-2 border-stone-400 w-full px-3 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600"/>
    </div>
  )
}

export default Navigation
