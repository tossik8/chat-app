import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/messages"

class MessageService{
    getMessages(id: number){
        return axios.get(`${USER_API_BASE_URL}/${id}`)
    }
}

export default new MessageService()
