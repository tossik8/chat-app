import { useState } from "react";
import UserService from "../services/UserService";
import { Link, useOutletContext } from "react-router-dom";
import { IForm } from "../routes/UserForm";

const Register = () => {
    const {isFilled, isEmailValid, setIsLoading, navigate} = useOutletContext<IForm>();
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

    const verifyFields = async ()=> {
        const filled = isFilled(user)
        const validEmail = isEmailValid(user.email)
        if (!filled || !validEmail) return false
        setIsLoading(true)
        const emailUnique = (await UserService.checkEmail(user.email)).data
        if(!emailUnique) {
            document.getElementById("email-error")!.textContent = "Email already exists"
            document.getElementById("email-error")?.classList.replace("invisible", "visible")
        }
        const usernameUnique = (await UserService.checkUsername(user.username)).data
        if(!usernameUnique){
            document.getElementById("username-error")!.textContent = "Username is not available"
            document.getElementById("username-error")?.classList.replace("invisible", "visible")
        }
        return emailUnique && usernameUnique
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        const isVerified:boolean = await verifyFields()
        if (isVerified){
            UserService.saveUser(user).then(() => {
                setUser({
                    name: "",
                    surname: "",
                    username: "",
                    email: "",
                    password: ""
                })
                navigate("/main")
            }).finally(() => {
                setIsLoading(false)
            })
        }
        else{
            setIsLoading(false)
        }
    }


  return (
    <form className="min-w-fit w-72 max-[750px]:w-9/12" method="post">
        <label htmlFor="name-input" className="block text-stone-700">Name
            <input autoComplete="true" className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" id="name-input" name="name" value={user.name} onChange={e => handleInput(e)} placeholder="Name" />
            <p id="name-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="surname-input" className="block text-stone-700">Surname
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" id="surname-input" name="surname" value={user.surname} onChange={e => handleInput(e)} placeholder="Surname"/>
            <p id="surname-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="username-input" className="block text-stone-700">Username
            <input autoComplete="true" className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="text" id="username-input" name="username" value={user.username} onChange={e => handleInput(e)} placeholder="Username"/>
            <p id="username-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="email-input" className="block text-stone-700">Email
            <input autoComplete="true" className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="email" id="email-input" name="email" value={user.email} onChange={e => handleInput(e)} placeholder="Email"/>
            <p id="email-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <label htmlFor="password-input" className="block text-stone-700">Password
            <input className="block border-2 border-stone-400 w-full px-3 py-1 rounded-lg placeholder:text-[0.9rem] placeholder:italic transition-{border-color} ease-in-out duration-200 focus:outline-0 focus:border-blue-200 focus:caret-blue-600" type="password" id="password-input" name="password" value={user.password} onChange={e => handleInput(e)} placeholder="Password"/>
            <p id="password-error" className="text-red-500 min-h-fit invisible text-xs">.</p>
        </label>
        <button className="bg-blue-400 border-2 border-blue-400 text-white my-2 w-24 h-7 rounded-2xl hover:text-blue-400 hover:bg-transparent hover:border-stone-400 focus-visible:outline-stone-400 focus-visible:bg-transparent focus-visible:text-blue-400 focus-visible:border-none active:text-sky-600 active:border-stone-400 active:bg-stone-400 active:outline-stone-400" onClick={handleClick} type="submit">Register</button>
        <p className="text-[0.7rem] italic">Already have an account? <Link className="text-blue-700 hover:text-amber-600" to="/">Log in</Link></p>
    </form>
  )
}

export default Register
