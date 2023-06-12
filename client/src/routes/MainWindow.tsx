import { useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"

const MainWindow = () => {
    const { chats, connectedUsers } = useSelector((state: RootState) => state.user)
    return (
    <div className="grid grid-cols-[35%_1fr] h-screen max-h-[1425px] max-w-[2560px] mx-auto">
        <div className="border-r border-stone-300">
            <Navigation/>
            {chats !== null && chats.map(chat => {
                const users = connectedUsers.filter(user => user.chats.find(chats => chats.id == chat.id))
                if(chat.name === null){
                    return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users}/>
                }
                return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users}/>
            })}
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
