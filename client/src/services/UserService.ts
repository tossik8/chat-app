import axios from "axios"

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"

class UserService{
    saveUser(user: object) {
        return axios.post(`${USER_API_BASE_URL}/registration`, user);
    }
    getUser(user: object){
        return axios.post(`${USER_API_BASE_URL}/login`, user);
    }
}
export default new UserService()
