import { WebSocket, WebSocketServer } from 'ws';
const jwt = require('jsonwebtoken')
import  {jwt_token}  from "@repo/backend-common/config";
import {prisma} from '@repo/database/client'

const wss = new WebSocketServer({ port: 8080 });

interface userProps  {
  ws : WebSocket,
  userId : String,
  rooms : String[]
}

let users: userProps[] = [];

const checkUser=(token:String): String | null => {
 try {
  const decoded = jwt.verify(token, jwt_token);

  if(typeof decoded == "string") {
      return null
  }

  if(!decoded || !decoded.userId) {
    return null;
  }

  return decoded.userId
 }catch(err) {
  return null
 }
}


wss.on('connection', function connection(ws,request) {
  ws.on('error', console.error);

  const url = request.url;
  if(!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get('token') ||  "";
  const userId: String | null = checkUser(token);

  if(userId == null) {
    ws.close();
    return;
  }

  users.push({
    ws : ws,
    userId : userId,
    rooms : []
  })

  ws.on('message', async function message(data) {
    const parsData = JSON.parse(data as unknown as string) // {type :"join the room", roomId : 56}

    if(parsData.type == "join the room") {
      const user =  users.find(r => r.ws == ws);
      user?.rooms.push(parsData.roomId)
    }

    if(parsData.type == "leave the room") {
      const user = users.find(x => x.ws === ws) ;
      if(!user) {
        return;
      }

      user.rooms = user.rooms.filter(x => x != parsData.roomId)
    }

    if(parsData.type == "chat") {
      const roomId = parsData.roomId;
      const message = parsData.message;
      
      const dbChat = await prisma.chat.create({
        data : {
          message,
          roomId,
          userId: userId as string
        }
      })
      users.forEach(user => {
        if(user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type : 'chat',
            message,
            roomId
          }))
        }
      })
    }
  });

});