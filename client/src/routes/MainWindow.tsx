import { useDispatch, useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"
import { useEffect, useRef } from "react"
import { setId, setMessages, setUsers } from "../store/selectedChatSlice"
import { IConnectionMessage, IMessage } from "../global/types"
import { IUser, setChats } from "../store/userSlice"
import FoundUser from "../components/FoundUser"


const MainWindow = () => {
    const { chats, id: userId } = useSelector((state: RootState) => state.user)
    const { id } = useSelector((state: RootState) => state.selectedChat)
    const { foundUsers } = useSelector((state: RootState) => state.foundUsers)
    const dispatch = useDispatch()
    let client = useRef<Client>(null!)
    useEffect(() => {
        client.current?.deactivate()
        client.current = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                client.current.subscribe(`/chat/${userId}/queue/connections`, (message) => {
                    const { chat, message: parsedMessage } : IConnectionMessage = JSON.parse(message.body)
                    chat.connectedUsers = chat.connectedUsers.filter((user: IUser) => user.id !== userId)
                    dispatch(setChats([...chats, chat]))
                    if(userId === parsedMessage.sender.id){
                        dispatch(setId(chat.id))
                        dispatch(setUsers(chat.connectedUsers))
                        dispatch(setMessages(parsedMessage))
                    }
                    sessionStorage.setItem(`chat-${chat.id}`, JSON.stringify([parsedMessage]))
                })
                chats.forEach(chat => {
                    const article = document.getElementById(`chat-${chat.id}`) as HTMLElement
                    client.current.subscribe(`/chat/${chat.id}/queue/messages`, (message) => {
                        const { text, time, sender } : IMessage = JSON.parse(message.body)
                        if(id === chat.id){
                            dispatch(setMessages({text, sender, time}))
                        }
                        updateSessionStorage(chat.id, text, sender, time)
                        displayChatInfo(article, time, sender, text)
                        if(userId !== sender.id && id !== chat.id){
                             const counter = article.getElementsByClassName("unread-messages-count")[0]
                             const num = +counter.getAttribute("data-value")! + 1
                             counter.setAttribute("data-value", `${num}`)
                             if(num !== 0){
                                 counter.textContent = `${num}`
                             }
                        }
                    })
                })
            }
        })
        client.current.activate()
    }, [id, chats])
    function displayChatInfo(article: HTMLElement, time: string, sender: IUser, text: string){
        if(article){
            article.getElementsByClassName("time")[0]!.textContent = time.replace(/^.+T(\d{2}:\d{2}).+$/, "$1")
            article.getElementsByClassName("sender")[0]!.textContent = `${sender.name} ${sender.surname}:`
            article.getElementsByClassName("message")[0]!.textContent = text
        }
    }

    function updateSessionStorage(id: number, text: string, sender: IUser, time: string){
        const messages = JSON.parse(sessionStorage.getItem(`chat-${id}`)!)
        messages.push({text, sender, time})
        sessionStorage.setItem(`chat-${id}`, JSON.stringify(messages))
    }

    return (
    <div className="grid grid-cols-[35%_1fr] h-screen max-h-[1425px] max-w-[2560px] mx-auto">
        <div>
            <Navigation/>
            <div className="max-h-[1400px] h-[94.59vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
                {foundUsers.length !== 0? foundUsers.map(foundUser => <FoundUser key={foundUser.id} id={foundUser.id} title={`${foundUser.name} ${foundUser.surname}`} username={foundUser.username}/>) : chats.map(chat => {
                    const users = chat.connectedUsers
                    if(chat.name){
                        return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users}/>
                    }
                    return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users}/>
                })}
            </div>
        </div>
        <ChatWindow client={client}/>
    </div>

  )
}

export default MainWindow
