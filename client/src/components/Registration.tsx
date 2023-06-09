import { useState } from "react";
import UserService from "../services/UserService";
import { Link, useOutletContext } from "react-router-dom";
import { IForm } from "../routes/UserForm";

const Register = () => {
    const {isFilled, isEmailValid, setIsLoading, navigate, setSession} = useOutletContext<IForm>();
    const [user, setUser] = useState({
        name:"",
        surname: "",
        username: "",
        email: "",
        password: ""
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const verifyFields = ()=> {
        const filled = isFilled(user)
        const validEmail = isEmailValid(user.email)
        return filled && validEmail
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        const isVerified:boolean = verifyFields()
        if (isVerified){
            setIsLoading(true)
            UserService.saveUser(user).then((user) => {
                setSession(user)
                setUser({
                    name: "",
                    surname: "",
                    username: "",
                    email: "",
                    password: ""
                })
                navigate("/main")
            }).catch((e) => {
                const {message} = e.response.data;
                if(message === "The username is already in use"){
                    document.getElementById("username-error")!.textContent = "Username is not available"
                    document.getElementById("username-error")?.classList.replace("invisible", "visible")
                }
                else if(message === "The email is already registered"){
                    document.getElementById("email-error")!.textContent = message
                    document.getElementById("email-error")?.classList.replace("invisible", "visible")
                }
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }


  return (
    <form className="min-w-fit w-72 max-[750px]:w-9/12" method="post">
        <label htmlFor="name-input" className="block text-stone-700">Name
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" name="name" autoComplete="given-name" id="name-input" value={user.name} onChange={e => handleInput(e)} placeholder="Name" />
            <p id="name-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="surname-input" className="block text-stone-700">Surname
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" name="surname" autoComplete="family-name" id="surname-input" value={user.surname} onChange={e => handleInput(e)} placeholder="Surname"/>
            <p id="surname-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="username-input" className="block text-stone-700">Username
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" name="username" autoComplete="username" id="username-input" value={user.username} onChange={e => handleInput(e)} placeholder="Username"/>
            <p id="username-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="email-input" className="block text-stone-700">Email
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="email" name="email" autoComplete="email" id="email-input" value={user.email} onChange={e => handleInput(e)} placeholder="Email"/>
            <p id="email-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="password-input" className="block text-stone-700">Password
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="password" name="password" autoComplete="new-password" id="password-input" value={user.password} onChange={e => handleInput(e)} placeholder="Password"/>
            <p id="password-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <button className="bg-blue-400 border-2 border-blue-400 text-white my-2 w-24 h-7 rounded-2xl transition-colors ease-in-out hover:text-stone-400 hover:bg-transparent hover:border-stone-400 focus-visible:outline-stone-400 focus-visible:bg-transparent focus-visible:text-stone-400 focus-visible:border-none active:text-white active:border-stone-400 active:bg-stone-400 active:outline-stone-400" onClick={handleClick} type="submit">Register</button>
        <p className="text-[0.7rem] italic">Already have an account? <Link className="text-blue-700 hover:text-amber-600" to="/">Log in</Link></p>
    </form>
  )
}

export default Register
