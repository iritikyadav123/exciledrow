import { Request, Response } from "express";
import express from 'express';
import  {jwt_token}  from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.post('/signup', (req:Request,res:Response) => {

})

app.post('/signin', (req:Request,res:Response) => {
    
})

app.post('/room', authMiddleware, (req:Request,res:Response) => {
    
})


app.listen(3001);