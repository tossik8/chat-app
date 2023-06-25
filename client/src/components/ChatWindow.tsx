import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"

interface ChatWindowProps{
  client: React.MutableRefObject<Client>
}

const ChatWindow = ({client} : ChatWindowProps) => {
  const { id, title, users, messages } = useSelector((state: RootState) => state.selectedChat)
  const { name, surname, id: senderId } = useSelector((state: RootState) => state.user)
  const [ input, setInput ] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  const handleClick = () => {
    if(input.trim()){
      setInput("")
      const now = new Date(Date.now())
      document.getElementsByTagName("textarea")[0].style.height = "20px"
      client.current.publish({destination: "/app/message", body: JSON.stringify({chatId: id, from: `${name} ${surname}`, text: input.trim(), senderId, time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`})})
      document.getElementById("message-textarea")!.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.ctrlKey && e.key === "Enter"){
      handleClick()
    }
  }
  function displayLogo(sender: string){
    const [name, surname] = sender.split(" ")
    return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase()
  }

  return (
    <main className="relative bg-[url('/pexels-mudassir-ali-2680270.jpg')] bg-cover max-h-screen">
      {users.length === 0? <p className="absolute top-1/2 left-[46%] text-white text-sm bg-gray-700/30 px-4 rounded-xl">Select a chat</p> :
        <>
          <div className="bg-white px-4 py-2 border-l border-stone-300">
            <p className="font-bold">{title}</p>
            {users.length === 1? null : <p className="text-xs text-stone-400">{users.length} members</p>}
          </div>
          <ul id="messages" className="px-4">{messages.map((message, i) => (
            <li className="flex items-end gap-2" key={i}>
              <div className="h-8 w-8 rounded-3xl flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 select-none text-sm font-medium">{displayLogo(message.from)}</div>
              {message.senderId === senderId?
                <div className="whitespace-pre p-1 rounded-md w-fit bg-blue-200 mt-3">
                  {message.text}
                  <span className="text-xs select-none text-neutral-500 relative top-1 ms-4">{message.time}</span>
                </div> :
                <div className="whitespace-pre p-1 rounded-md w-fit bg-white mt-3">
                  {message.text}
                  <span className="text-xs select-none text-neutral-500 relative top-1 ms-4">{message.time}</span>
                </div>}
            </li>))}
          </ul>
          <div className="bg-white flex items-center absolute bottom-0 w-full px-4 py-2 border-l border-stone-300">
            <textarea id="message-textarea" onKeyDown={e => handleKeyDown(e)} onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full pr-5 focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
            <button onClick={handleClick} className="p-2 hover:bg-stone-200 focus-visible:outline-0 focus-visible:bg-stone-200 active:scale-90"><img src="/send.png" width={25} alt="Send icon."/></button>
          </div>
        </>}
    </main>
  )
}

export default ChatWindow
