import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import { useState } from "react"

export interface IForm{
  isFilled: (user: object) => boolean,
  isEmailValid: (email: string) => boolean,
  setIsLoading: (isLoading: boolean) => void,
  navigate: NavigateFunction
}

const UserForm = () => {

  const [isLoading, setIsLoading ] = useState(false)
  const navigate = useNavigate()

  const isFilled = (user: object) => {
    let isFilled = true
    for (const [k, v] of Object.entries(user)){
        const val = v.trim()
        if (!val){
            document.getElementById(`${k}-error`)!.textContent = "Field is required"
            document.getElementById(`${k}-error`)?.classList.replace("invisible", "visible")
            isFilled = false
        }
        else{
            document.getElementById(`${k}-error`)?.classList.replace("visible", "invisible")
        }
    }
    return isFilled
  }

  const isEmailValid = (email: string) => {
      if(email.trim() === "") return false
      if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
          return true
      }
      document.getElementById("email-error")!.textContent = "Email is invalid"
      document.getElementById("email-error")?.classList.replace("invisible", "visible")
      return false
  }
  return (
    <div className="bg-gradient-to-r flex justify-center items-center from-cyan-400 to-blue-400 login-wrapper min-h-screen">
      {isLoading? <Loading/> : null }
      <main className="flex max-[750px]:flex-col bg-white p-5 rounded-2xl w-10/12 justify-center items-center max-w-4xl min-w-60 gap-8">
        <div className="max-[750px]:text-center">
          <h1 className="text-4xl text-orange-400 mb-6">Welcome to Chatopia!</h1>
          <h2 className="text-3xl bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Where Conversations Come Alive!</h2>
        </div>
        <Outlet context={{isFilled, isEmailValid, setIsLoading, navigate}} />
      </main>
    </div>
  )
}

export default UserForm
