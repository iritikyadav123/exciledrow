import { WebSocketServer } from 'ws';
import  jwt from 'jsonwebtoken'
import  {jwt_token}  from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws,request) {
  ws.on('error', console.error);

  const url = request.url;
  if(!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get('token') ||  "";
  const decoded = jwt.verify(token, jwt_token);

  if(typeof decoded == "string") {
      ws.close
      return
  }

  if(!decoded || !decoded.userId) {
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});