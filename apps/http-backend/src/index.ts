const express = require('express');
import { Response, Request } from "express";
import { jwt_token } from "./config";
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