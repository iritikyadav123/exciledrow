"use client";

import { useEffect, useState } from "react";
import useSocket from "../hook/useSocket";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNGQ2MGUxNC05NzhhLTQ1ODgtOTE0My00NjE1YzcyNzc1YjciLCJ1c2VybmFtZSI6ImlyaXRpa3lhZGF2QDEyMyIsImlhdCI6MTc2NjkyODQwOX0.cJ2OMwD-837eNx6EYbtG5-HoFZhP8YJZVU7pisN_3Lk"


export default function ChatRoomClient({
    messages,
    id
} : {
    messages : {message : string}[],
    id : String
}) {
    const [chat, setChat] = useState(messages);
    const {socket, loading} = useSocket(token);
    const [currentMessage, setCurrentMessage] = useState("");


    useEffect(() => {
            if(socket && !loading) {
            socket.send(JSON.stringify({
                type : "join the room",
                roomId : "cea59141-b0c6-4f38-aaf1-101992e2b422"
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
                chat &&chat.map((item,key) => 
                     <div key={key}>
                        {item.message}
                    </div>  
                )
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
                        message : currentMessage
                    }))
                    setCurrentMessage("")
                }}>send the message</button>
            </div>
        </div>
    )
}