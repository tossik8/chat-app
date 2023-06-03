import "../css/Loading.css"

const Loading = () => {
  return (
    <div className="absolute w-screen h-screen bg-slate-600/80">
        <span className="loader absolute top-2/4 min-[651px]:left-[49%] min-[500px]:left-[45%] min-[290px]:left-[43%] left-[41%]"></span>
    </div>
  )
}

export default Loading
