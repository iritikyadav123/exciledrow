import { Request, Response } from "express";
import express from 'express';
import  { jwt_token }  from "@repo/backend-common/config";
import  {authMiddleware}  from "./middleware.js";
import {ceateRoomSchema, signinSchema, userSchema} from '@repo/common/types'

const app = express();
app.use(express.json());

app.post('/signup', (req:Request,res:Response) => {
    const data = userSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(401).json({
            msg : "user input is incorrect forment",
            send : data.error
        })
    }
    return;

})

app.post('/signin', (req:Request,res:Response) => {
    const data = signinSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(401).json({
            msg : "user input is incorrect forment",
            send : data.error
        })
    }
    return;
    
})

app.post('/room', authMiddleware, (req:Request,res:Response) => {
    const data = ceateRoomSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(401).json({
            msg : "user input is incorrect forment",
            send : data.error
        })
    }
    return;
})


app.listen(3001);