import { Request, Response } from "express";
import express from 'express';
import  { jwt_token }  from "@repo/backend-common/config";
import  {authMiddleware} from "./middleware.js";
import {ceateRoomSchema, signinSchema, userSchema} from'@repo/common/types'
import {prisma} from '@repo/database/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json());

app.post('/signup', async(req:Request,res:Response) => {
    const parseData = userSchema.safeParse(req.body);
    if(!parseData.success) {
        return res.status(401).json({
            msg : "user input is incorrect forment",
            send : parseData.error
        })

    }
    const encryptPassword = await bcrypt.hash(parseData.data.password,10);
    try {
        const dbUser = await prisma.user.create({
            data : {
                username : parseData.data.username,
                password : encryptPassword,
                name : parseData.data.name
            }
        })


        if(!dbUser) {
            return res.status(401).json({
                msg : "unable to login"
            })
        }

        const jsonToken = jwt.sign({userId : dbUser.userId, username : dbUser.username}, jwt_token)

        return res.status(200).json({
            msg : "sucessfully login",
            userId : dbUser.userId,
            token : jsonToken
        })

    }catch(err) {
        return res.status(411).json({
            msg : `found some databse side error ${err}`
        })
    }

})

app.post('/signin', async(req:Request,res:Response) => {
    const parseData = signinSchema.safeParse(req.body);
    if(!parseData.success) {
        return res.status(401).json({
            msg : "incorrect input formet",
            error: parseData.error
        })
    }
   
    try {
        const user = await prisma.user.findFirst({
            where : {
                username : parseData.data.username
            }
        })
    
        if(!user) {
            return res.status(401).json({
                msg : "user has not been registered"
            })
        }
    
        const isPasswordValid = await bcrypt.compare(
            parseData.data.password,  
            user.password           
        );
    
        if(!isPasswordValid) {
            return res.status(401).json({
                msg : "incorrect password"
            })
        }

        const jsonToken = jwt.sign({userId : user.userId, username : user.username}, jwt_token)

        return res.status(200).json({
            msg : "user signin sucessfully",
            userId : user.userId,
            token : jsonToken
        })
    }catch(err) {
        return res.status(500).json({
            msg : "some server related issue",
            error : err
        })
    }
    
})

app.post('/room', authMiddleware, async(req:Request,res:Response) => {
    const ParseData = ceateRoomSchema.safeParse(req.body);
    if(!ParseData.success) {
        return res.status(401).json({
            msg : "user input is incorrect forment",
            send : ParseData.error
        })
    }
    // @ts-ignore
    const userId = req.userId
    if(!userId) {
        return res.send(404).json({
            msg : "user id is undefined"
        })
    }

    try {
        const roomData = await prisma.room.create({
            data : {
                slug : ParseData.data.name,
                adminId : userId
            }
        })

        if(!roomData) {
            return res.send(404).json({
                msg : "unable to regiester the room"
            })
        }

        return res.status(200).json({
            msg : "successfully register the room",
            roomId : roomData.roomId
        })

    }catch(err) {
        return res.status(500).json({
            msg : "some server related issue",
            err : err
        })
    }
})


app.listen(3001);