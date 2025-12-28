"use client";

import { useEffect, useState } from "react";
import useSocket from "../hook/useSocket";


export default function ChatRoomClient({
    messages,
    id
} : {
    messages : {message : string}[],
    id : String
}) {
    const [chat, setChat] = useState(messages);
    const {socket, loading} = useSocket("fee");
    const [currentMessage, setCurrentMessage] = useState("");


    useEffect(() => {
        if(socket && !loading) {
            socket.send(JSON.stringify({
                type : "join the room",
                roomId : id
            }))
            socket.onmessage=(event:any) => {
                const parseData = JSON.parse(event.data)
                if(parseData.type == 'chat') {
                    setChat(c => [...c, {message : parseData.message}])
                }
            }
        }
    },[loading, socket, id])

    return (
        <div>
            <div className="border-4 border-amber-950">
            {
                chat &&chat.map((item,key) => (
                    <div>
                        {item.message}
                    </div>
                ))
            }
            </div>
            <div>
                <input type="text" value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}}></input>
            </div>
            <div >
                <button onClick={() => {
                    socket?.send(JSON.stringify({
                        type : "chat",
                        roomId : id,
                        messages : currentMessage
                    }))
                    setCurrentMessage("")
                }}>send the message</button>
            </div>
        </div>
    )
}