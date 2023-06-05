import Chat from "../components/Chat"
import ChatWindow from "../components/ChatWindow"
import Navigation from "../components/Navigation"

const MainWindow = () => {
  return (
    <div className="grid grid-cols-[35%_1fr] max-w-[110rem] mx-auto">
        <div>
            <Navigation/>
            {Array.from(Array(10), (e, i) => <Chat key={i} id={i}/>)}
        </div>
        <ChatWindow/>
    </div>

  )
}

export default MainWindow
