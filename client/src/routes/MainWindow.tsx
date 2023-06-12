import { useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"

const MainWindow = () => {
    const { chats, connectedUsers } = useSelector((state: RootState) => state.user)
    return (
    <div className="grid grid-cols-[35%_1fr] max-w-[110rem] mx-auto">
        <div>
            <Navigation/>
            {chats.map(chat => {
                if(chat.name === null){
                    const res = connectedUsers.find(user => user.chats.find(chats => chats.id == chat.id))
                    return <Chat key={chat.id} id={chat.id} title={`${res!.name} ${res!.surname}`}/>
                }
                return <Chat key={chat.id} id={chat.id} title={chat.name}/>
            })}
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
