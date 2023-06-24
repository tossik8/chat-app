import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"

interface ChatWindowProps{
  client: React.MutableRefObject<Client>
}

const ChatWindow = ({client} : ChatWindowProps) => {
  const { id, title, users, messages } = useSelector((state: RootState) => state.selectedChat)
  const { username } = useSelector((state: RootState) => state.user)
  const [ input, setInput ] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  const handleClick = () => {
    if(input){
      setInput("")
      client.current.publish({destination: "/app/message", body: JSON.stringify({chatId: id, from: username, text: input})})
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.ctrlKey && e.key === "Enter"){
      handleClick()
    }
  }

  return (
    <main className="relative bg-[url('/pexels-mudassir-ali-2680270.jpg')] bg-cover">
      {users.length === 0? <p className="absolute top-1/2 left-[46%] text-white text-sm bg-gray-700/30 px-4 rounded-xl">Select a chat</p> :
        <>
          <div className="bg-white px-4 py-2 border-l border-stone-300">
            <p className="font-bold">{title}</p>
            {users.length === 1? null : <p className="text-xs text-stone-400">{users.length} members</p>}
          </div>
          <ul id="messages" className="absolute bottom-20 px-4">{messages.map((message, i) => <li key={i}>{message.text}</li>)}</ul>
          <div className="bg-white flex items-center absolute bottom-0 w-full p-4 border-l border-stone-300">
            <textarea onKeyDown={e => handleKeyDown(e)} onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full pr-5 focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
            <button className="transition-{scale} ease-in-out duration-75 hover:scale-110 focus-visible:outline-0 focus-visible:scale-110"><img src="/send.png" width={25} alt="Send icon." onClick={handleClick}/></button>
          </div>
        </>}
    </main>
  )
}

export default ChatWindow
