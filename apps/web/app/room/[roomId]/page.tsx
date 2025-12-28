import axios from "axios"
import { BACKEND_URL } from "../../config"
import ChatRoom from "../../../component/chatRoom"

async function getRoom(slug: String) {
   const response = await axios.get("http://localhost:3001/room/chat-room-1") 
   return response.data.room.roomId
}

export default async function Home({
    params 
} : {
    params : {
        slug : String
}
}) {
    const slug = params.slug;
    const roomId = await getRoom(slug)

    return <ChatRoom id={roomId}></ChatRoom>
}
