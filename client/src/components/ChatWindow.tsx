import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"
import { useDispatch } from "react-redux"
import { setId } from "../store/foundUsersSlice"
import MessagesSection from "./MessagesSection"
import { IChat, IMessage } from "../global/types"
import { IUser, setChats, updateChat } from "../store/userSlice"
import { setId as setChatId, setMessages, setUsers } from "../store/selectedChatSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

let client: Client = null!

interface IChatWindow{
  width: number
  setIsChatWindow: (isChatWindow: boolean) => void
}

const ChatWindow = ({width, setIsChatWindow} : IChatWindow) => {
  const { id, title, users } = useSelector((state: RootState) => state.selectedChat)
  const { id: userId, chats } = useSelector((state: RootState) => state.user)
  const { id: foundUserId } = useSelector((state: RootState) => state.foundUsers)
  const dispatch = useDispatch()
  const [ input, setInput ] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  const handleClick = () => {
    if(input.trim()){
      if(foundUserId !== -1){
        client.publish({destination: "/app/connection", body: JSON.stringify({receiverId: foundUserId, text: input.trim(), senderId: userId})})
        dispatch(setId(-1))
      }
      else{
        client.publish({destination: "/app/message", body: JSON.stringify({chatId: id, text: input.trim(), senderId: userId})})
      }
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

  useEffect(() => {
    if(client?.connected){
      client.deactivate()
    }
    client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe(`/chat/${userId}/queue/connections`, (message) => {
                const chat : IChat = JSON.parse(message.body)
                chat.connectedUsers = chat.connectedUsers.filter((user: IUser) => user.id !== userId)
                if(chat.connectedUsers.length === 1){
                  chat.name = `${chat.connectedUsers[0].name} ${chat.connectedUsers[0].surname}`
                }
                dispatch(setChats([...chats, chat]))
                if(userId === chat.messages[0].sender.id){
                    dispatch(setChatId(chat.id))
                    dispatch(setUsers(chat.connectedUsers))
                    dispatch(setMessages(chat.messages[0]))
                }
            })
            chats.forEach(chat => {
                client.subscribe(`/chat/${chat.id}/queue/messages`, (message) => {
                    const article = document.getElementById(`chat-${chat.id}`) as HTMLElement
                    const { text, time, sender } : IMessage = JSON.parse(message.body)
                    if(id === chat.id){
                        dispatch(setMessages({text, sender, time}))
                    }
                    const chatCopy = JSON.parse(JSON.stringify(chat))
                    chatCopy.messages.push({text, time, sender})
                    dispatch(updateChat({id: chat.id, chat: chatCopy}))
                    displayChatInfo(article, time, sender, text, chat.id)
                })
            })
        }
    })
    client.activate()
  }, [id, chats])

  function displayChatInfo(article: HTMLElement, time: string, sender: IUser, text: string, chatId: number){
    if(article){
        article.getElementsByClassName("time")[0]!.textContent = time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")
        article.getElementsByClassName("sender")[0]!.textContent = `${sender.name} ${sender.surname}:`
        article.getElementsByClassName("message")[0]!.textContent = text
        displayMissedMessagesCount(article, sender, chatId)
    }
}
  function displayMissedMessagesCount(article: HTMLElement, sender: IUser, chatId: number){
    if(userId !== sender.id && id !== chatId){
      const counter = article.getElementsByClassName("unread-messages-count")[0]
      const num = +counter.getAttribute("data-value")! + 1
      counter.setAttribute("data-value", `${num}`)
      if(num !== 0){
          counter.textContent = `${num}`
      }
    }
  }

  return (
    <main className="relative bg-[url('/pexels-mudassir-ali-2680270.jpg')] bg-cover max-h-screen">
      {id === -1? <p className="absolute top-1/2 left-[46%] text-white text-sm bg-gray-700/30 px-4 rounded-xl">Select a chat</p> :
        <>
          <div className="bg-white min-[768px]:px-4 px-2 py-2 border-l border-stone-300 h-[5.3vh] max-h-[80px] flex items-center gap-2">
            {width < 768 && <button className="focus:scale-110 hover:scale-110 focus:text-cyan-400 hover:text-cyan-400 outline-0 transition-{scale} duration-200 ease-in-out" onClick={() => setIsChatWindow(false)}><FontAwesomeIcon icon={faArrowLeft}/></button>}
            <div className="flex flex-col">
              <p className="font-bold">{title}</p>
              {users.length <= 1? null : <p className="text-xs text-stone-400">{users.length + 1} members</p>}
            </div>
          </div>
          <MessagesSection/>
          <div className="bg-white flex absolute bottom-0 items-center gap-5 min-h-[6.7vh] w-full px-4 border-l border-stone-300">
            <textarea id="message-textarea" onKeyDown={e => handleKeyDown(e)} onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
            <button onClick={handleClick} className="p-2 hover:bg-stone-200 focus-visible:outline-0 focus-visible:bg-stone-200 active:scale-90"><img src="/send.png" width={25} alt="Send icon."/></button>
          </div>
        </>}
    </main>
  )
}

export default ChatWindow
