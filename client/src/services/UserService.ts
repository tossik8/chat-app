import axios from "axios"

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"

class UserService{
    saveUser(user: object) {
        return axios.post(`${USER_API_BASE_URL}/registration`, user)
    }
    logInUser(user: object){
        return axios.post(`${USER_API_BASE_URL}/login`, user)
    }
    getUsers(key: string){
        return axios.get(`${USER_API_BASE_URL}?query=${key}`)
    }
}
export default new UserService()
