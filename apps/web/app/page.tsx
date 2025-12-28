"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"

export default function Home() {
  const route = useRouter()
  const [roomId, setRoomId] = useState("");
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
       <div className="flex items-center justify-center gap-2 border-2 rounded-3xl overflow-hidden border-amber-50 text-white pr-1.5 pl-1.5">
        <input value={roomId} onChange={(e) => {setRoomId(e.target.value)}}></input>
        <button  className="hover:bg-amber-900 hover:text-amber-200 text-2xl p-2 rounded-3xl" onClick={() => {
          route.push(`/room/${roomId}`)
        }}>join the room</button>
       </div>
    </div>
  )
}