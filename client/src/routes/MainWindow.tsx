import { useDispatch, useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"
import { Client } from "@stomp/stompjs"
import { useEffect, useRef } from "react"
import { clearMessages, setMessages } from "../store/selectedChatSlice"


const MainWindow = () => {
    const { chats, connectedUsers } = useSelector((state: RootState) => state.user)
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
                        if(id === chat.id){
                            dispatch(setMessages(JSON.parse(message.body)))
                        }
                        else{
                            console.log(message.body)
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
                const users = connectedUsers.filter(user => user.chats.find(chats => chats.id == chat.id))
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
