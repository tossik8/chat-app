import axios from "axios";

const CHAT_API_BASE_URL = "http://localhost:8080/api/v1/chats"

class ChatService{
    getChats(id: number){
        return axios.get(`${CHAT_API_BASE_URL}/${id}`)
    }
}
export default new ChatService()
