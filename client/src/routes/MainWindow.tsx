import { useSelector } from "react-redux"
import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"
import { RootState } from "../store/store"
import FoundUser from "../components/FoundUser"
import { useEffect, useState } from "react"
import ChatService from "../services/ChatService"
import { useDispatch } from "react-redux"
import { setChats } from "../store/userSlice"


const MainWindow = () => {
    const { chats, id } = useSelector((state: RootState) => state.user)
    const { foundUsers } = useSelector((state: RootState) => state.foundUsers)
    const [ width, setWidth ] = useState<number>(window.innerWidth)
    const [ isChatWindow, setIsChatWindow ] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        ChatService.getChats(id).then(message => {
            dispatch(setChats(message.data))
        })
    }, [])

    window.addEventListener("resize", () => setWidth(window.innerWidth))

    return (
    <div className="grid min-[768px]:grid-cols-[35%_1fr] h-screen max-h-[1425px] max-w-[2560px] mx-auto">
        {width >= 768?
            <>
                <div>
                    <Navigation/>
                    <div className="max-h-[1400px] h-[94.59vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
                        {foundUsers.length !== 0? foundUsers.map(foundUser => <FoundUser key={foundUser.id} id={foundUser.id} title={`${foundUser.name} ${foundUser.surname}`} username={foundUser.username} setIsChatWindow={setIsChatWindow} width={width}/>) : chats.map(chat => {
                            const users = chat.connectedUsers
                            if(chat.name){
                                return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users} messages={chat.messages} setIsChatWindow={setIsChatWindow} width={width}/>
                            }
                            return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users} messages={chat.messages} setIsChatWindow={setIsChatWindow} width={width}/>
                        })}
                    </div>
                </div>
                <ChatWindow width={width} setIsChatWindow={setIsChatWindow}/>
            </> :
            isChatWindow ? <ChatWindow width={width} setIsChatWindow={setIsChatWindow}/> :
            <>
                <Navigation/>
                <div className="max-h-[1400px] h-[94.59vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
                    {foundUsers.length !== 0? foundUsers.map(foundUser => <FoundUser key={foundUser.id} id={foundUser.id} title={`${foundUser.name} ${foundUser.surname}`} username={foundUser.username} setIsChatWindow={setIsChatWindow} width={width}/>) : chats.map(chat => {
                        const users = chat.connectedUsers
                        if(chat.name){
                            return <Chat key={chat.id} id={chat.id} title={chat.name} connectedUsers={users} messages={chat.messages} setIsChatWindow={setIsChatWindow} width={width}/>
                        }
                        return <Chat key={chat.id} id={chat.id} title={`${users[0]!.name} ${users[0]!.surname}`} connectedUsers={users} messages={chat.messages} setIsChatWindow={setIsChatWindow} width={width}/>
                    })}
                </div>
            </>
            }
    </div>
  )
}

export default MainWindow
