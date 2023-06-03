import React, { useState } from "react"
import UserService from "../services/UserService";
import { Link, useOutletContext } from "react-router-dom";
import { IForm } from "../routes/UserForm";

const Login = () => {

    const {isFilled, isEmailValid, setIsLoading, navigate} = useOutletContext<IForm>();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        const filled = isFilled(user)
        const validEmail = isEmailValid(user.email)
        if(filled && validEmail){
            setIsLoading(true)
            UserService.getUser(user).then(() => {
                setUser({
                    email: "",
                    password: ""
                })
                navigate("/main")
            }).catch(() => {
                document.getElementById("password-error")!.textContent = "Incorrect email or password"
                document.getElementById("password-error")?.classList.replace("invisible", "visible")
                setUser({
                    email: user.email,
                    password: ""
                })
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

  return (
    <form className="w-72 max-[750px]:w-9/12">
        <label htmlFor="email-input" className="block text-stone-700">Email
            <input autoComplete="true" className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="email" name="email" id="email-input" placeholder="Email" value={user.email} onChange={e => handleInput(e)} />
            <p id="email-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label className="block text-stone-700" htmlFor="password-input">Password
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="password" name="password" id="password-input" placeholder="Password" value={user.password} onChange={e => handleInput(e)}/>
            <p id="password-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <button onClick={handleClick} className="bg-blue-400 border-2 border-blue-400 text-white my-2 w-24 h-7 rounded-2xl hover:text-blue-400 hover:bg-transparent hover:border-stone-400 focus-visible:outline-stone-400 focus-visible:bg-transparent focus-visible:text-blue-400 focus-visible:border-none active:text-sky-600 active:border-stone-400 active:bg-stone-400 active:outline-stone-400" type="submit">Log in</button>
        <p className="text-[0.7rem] italic text-stone-700">Haven't registered? <Link className="text-blue-700 hover:text-amber-600" to="/register">Register</Link></p>
    </form>
  )
}

export default Login
