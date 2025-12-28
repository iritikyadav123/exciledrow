import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./chatRoomClient";

async function getChats(roomId : String) {
    console.log(roomId)
    const response = await axios.get('http://localhost:3001/chats/cea59141-b0c6-4f38-aaf1-101992e2b422');
    return response.data
}

export default async function ChatRoom({id} : {id : String}) {
     const messages = await getChats(id)
     return <ChatRoomClient id={id} messages={messages}></ChatRoomClient>
}