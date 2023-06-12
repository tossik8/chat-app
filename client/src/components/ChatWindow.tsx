import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

const ChatWindow = () => {
  const { title, users } = useSelector((state: RootState) => state.selectedChat)
  const [input, setInput] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  return (
    <main className="bg-sky-800 relative">
      {users.length === 0? <p className="absolute top-1/2 left-[46%] text-white text-sm bg-gray-400/30 px-4 rounded-xl">Select a chat</p> :
        <>
          <div className="bg-white px-4 py-2">
            <p className="font-bold">{title}</p>
            {users.length === 1? null : <p className="text-xs text-stone-400">{users.length} members</p>}
          </div>
          <div className="bg-white flex items-center absolute bottom-0 w-full p-5">
            <textarea onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full pr-5 focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
            <button className="transition-{scale} ease-in-out duration-75 hover:scale-110 focus-visible:outline-0 focus-visible:scale-110"><img src="/send.png" width={25} alt="Send icon." /></button>
          </div>
        </>}
    </main>
  )
}

export default ChatWindow
