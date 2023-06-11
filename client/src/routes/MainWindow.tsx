import { useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"

const MainWindow = () => {
    const {connectedUsers} = useSelector((state: RootState) => state.user)
    return (
    <div className="grid grid-cols-[35%_1fr] max-w-[110rem] mx-auto">
        <div>
            <Navigation/>
            {connectedUsers.map(user => <Chat key={user.id} id={user.id} name={user.name} surname={user.surname}/>)}
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
