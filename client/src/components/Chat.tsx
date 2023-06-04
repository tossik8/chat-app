interface IChat{
  id: number
}

const Chat = ({id} : IChat) => {
  const activeStateColour = "bg-blue-200"
  const hoveredStateColour = "bg-stone-200"
  const handleClick = () => {
    Array.from(document.getElementsByTagName("article")).map(article => {
      article.classList.remove(activeStateColour)
    })
    document.getElementById(id.toString())?.classList.add(activeStateColour)
  }
  const handleMouseOver = () => {
    const hoveredElement = document.getElementById(id.toString());
    if(!hoveredElement?.classList.contains(activeStateColour)){
      hoveredElement?.classList.add(hoveredStateColour)
    }
  }
  const handleMouseLeave = () => {
    document.getElementById(id.toString())?.classList.remove(hoveredStateColour);
  }
  return (
    <article key={id} id={id.toString()} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ease-in-out duration-150">
      <div className="flex gap-4">
        <img src="/image-emily.jpg" alt="Chat image." className="w-12 rounded-3xl"/>
        <div className="flex flex-col gap-1">
          <p className="font-bold">Emily</p>
          <p className="text-sm"><span className="text-blue-400">Mike: </span> Last Message</p>
        </div>
      </div>
      <div className="flex flex-col items-end text-sm gap-1">
        <p>15:20</p>
        <div className="bg-stone-400 min-w-fit px-[0.3rem] rounded-xl text-center">9</div>
      </div>

    </article>
  )
}

export default Chat
