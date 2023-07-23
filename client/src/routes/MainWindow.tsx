import { useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"
import FoundUser from "../components/FoundUser"


const MainWindow = () => {
    const { chats } = useSelector((state: RootState) => state.user)
    const { foundUsers } = useSelector((state: RootState) => state.foundUsers)

    return (
    <div className="grid grid-cols-[35%_1fr] h-screen max-h-[1425px] max-w-[2560px] mx-auto">
        <div>
            <Navigation/>
            <div className="max-h-[1400px] h-[94.59vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
                {foundUsers.length !== 0? foundUsers.map(foundUser => <FoundUser key={foundUser.id} id={foundUser.id} title={`${foundUser.name} ${foundUser.surname}`} username={foundUser.username}/>) : chats.map(chat => {
                    const users = chat.connectedUsers
                    if(chat.name){
                        return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users} messages={chat.messages}/>
                    }
                    return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users} messages={chat.messages}/>
                })}
            </div>
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
