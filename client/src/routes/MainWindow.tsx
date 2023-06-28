import { useDispatch, useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"
import { useEffect, useRef } from "react"
import { clearMessages, setMessages } from "../store/selectedChatSlice"


const MainWindow = () => {
    const { chats, id: userId } = useSelector((state: RootState) => state.user)
    const { id } = useSelector((state: RootState) => state.selectedChat)
    const dispatch = useDispatch()
    let client = useRef<Client>(null!)
    useEffect(() => {
        client.current?.deactivate()
        client.current = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                chats.forEach(chat => {
                    client.current.subscribe(`/chat/${chat.id}/queue/messages`, (message) => {
                        const parsedMessage = JSON.parse(message.body)
                        if(id === chat.id){
                            dispatch(setMessages(parsedMessage))
                        }
                        const { text, from, time, senderId } = parsedMessage
                        const article = document.getElementById(`${chat.id}`) as HTMLElement
                        article.getElementsByClassName("time")[0]!.textContent = time
                        article.getElementsByClassName("sender")[0]!.textContent = `${from}:`
                        article.getElementsByClassName("message")[0]!.textContent = text
                        if(userId !== senderId && id !== chat.id){
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
        dispatch(clearMessages())
    }, [id])

    return (
    <div className="grid grid-cols-[35%_1fr] h-screen max-h-[1425px] max-w-[2560px] mx-auto">
        <div>
            <Navigation/>
            {chats !== null && chats.map(chat => {
                const users = chat.connectedUsers
                if(chat.name === null){
                    return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users}/>
                }
                return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users}/>
            })}
        </div>
        <ChatWindow client={client}/>
    </div>

  )
}

export default MainWindow
