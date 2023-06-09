import { useState } from "react"

const ChatWindow = () => {
  const [input, setInput] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    textarea.style.height = "0"
    textarea.style.height = textarea.scrollHeight + "px"
    setInput(e.target.value)
  }

  return (
    <main className="h-screen max-h-[60rem] bg-black/70 relative">
      <div className="bg-white flex items-center absolute bottom-0 w-full p-5 border border-stone-200">
        <textarea onChange={e => handleChange(e)} className="placeholder:text-[0.9rem] h-5 max-h-28 overflow-hidden placeholder:italic resize-none w-full pr-5 focus:outline-0 focus:caret-blue-600" placeholder="Your message..." value={input} name="message"/>
        <button className="transition-{scale} ease-in-out duration-75 hover:scale-110 focus-visible:outline-0 focus-visible:scale-110"><img src="/send.png" width={25} alt="Send icon." /></button>
      </div>
    </main>
  )
}

export default ChatWindow
