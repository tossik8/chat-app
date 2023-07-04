import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import UserService from "../services/UserService"
import { useDispatch } from "react-redux"
import { setFoundUsers } from "../store/foundUsersSlice"

const Navigation = () => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const dispatch = useDispatch()
  const handleChange = () => {
    UserService.getUsers(inputRef.current.value).then(message => {
      dispatch(setFoundUsers(message.data))
    })
  }
  return (
    <div className="flex gap-4 p-4">
      <button className="hover:scale-125 focus-visible:outline-0 focus-visible:scale-125 transition-{scale} duration-200 ease-in-out"><FontAwesomeIcon icon={faEllipsisVertical} size="xl" color="rgb(168 162 158)" /></button>
      <input ref={inputRef} onChange={handleChange} type="text" name="people-search" className="border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600"/>
    </div>
  )
}

export default Navigation
