import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"

interface ChatWindowProps{
  client: React.MutableRefObject<Client>
}

const ChatWindow = ({client} : ChatWindowProps) => {
  const { id, title, users, messages } = useSelector((state: RootState) => state.selectedChat)
  const { id: senderId } = useSelector((state: RootState) => state.user)
  const [ input, setInput ] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  const handleClick = () => {
    if(input.trim()){
      client.current.publish({destination: "/app/message", body: JSON.stringify({chatId: id, text: input.trim(), senderId})})
      setInput("")
      document.getElementsByTagName("textarea")[0].style.height = "20px"
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

  useEffect(() => {
    document.getElementById("messages")?.scrollTo({top: document.getElementById("messages")?.scrollHeight, left: 0, behavior: "smooth"})
  }, [messages])

  return (
    <main className="relative bg-[url('/pexels-mudassir-ali-2680270.jpg')] bg-cover max-h-screen">
      {id === -1? <p className="absolute top-1/2 left-[46%] text-white text-sm bg-gray-700/30 px-4 rounded-xl">Select a chat</p> :
        <>
          <div className="bg-white px-4 py-2 border-l border-stone-300 h-[5.3vh] max-h-[80px] flex items-center">
            <p className="font-bold">{title}</p>
            {users.length === 1? null : <p className="text-xs text-stone-400">{users.length + 1} members</p>}
          </div>
          <ul id="messages" className="px-4 h-[88vh] max-h-[1232.910px] pb-3 w-full overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">{messages.map((message, i) => (
            <li className="flex items-end gap-2" key={i}>
              <div className="h-8 w-8 rounded-3xl flex justify-center items-center text-white bg-gradient-to-b from-cyan-500 to-blue-500 select-none text-sm font-medium">{displayLogo(message.sender.name + " " + message.sender.surname)}</div>
              {message.sender.id === senderId?
                <div className="p-1 rounded-md bg-blue-200 mt-3">
                  <p className="whitespace-pre-wrap break-words max-w-[30rem] inline-block">{message.text}</p>
                  <span className="text-xs select-none text-neutral-500 ml-2 relative top-1">{message.time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")}</span>
                </div> :
                <div className="p-1 rounded-md bg-white mt-3">
                  <p className="whitespace-pre-wrap break-words max-w-[30rem] inline-block">{message.text}</p>
                  <span className="text-xs select-none text-neutral-500 ml-2 relative top-1">{message.time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")}</span>
                </div>}
            </li>))}
          </ul>
          <div className="bg-white flex absolute bottom-0 items-center gap-5 min-h-[6.7vh] w-full px-4 border-l border-stone-300">
            <textarea id="message-textarea" onKeyDown={e => handleKeyDown(e)} onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
            <button onClick={handleClick} className="p-2 hover:bg-stone-200 focus-visible:outline-0 focus-visible:bg-stone-200 active:scale-90"><img src="/send.png" width={25} alt="Send icon."/></button>
          </div>
        </>}
    </main>
  )
}

export default ChatWindow
