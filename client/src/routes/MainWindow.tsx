import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"

const MainWindow = () => {
  return (
    <>
        <div>
            <Navigation/>
            <Chat/>
        </div>
        <ChatWindow/>
    </>

  )
}

export default MainWindow
