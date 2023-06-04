import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"

const MainWindow = () => {
  return (
    <div className="grid grid-cols-[35%_1fr] max-w-[110rem] mx-auto">
        <div>
            <Navigation/>
            {[0, 1, 2].map(element => <Chat key={element} id={element}/>)}
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
