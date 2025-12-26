import { NextFunction, Request, Response } from "express"
const { jwt_token } = require ("@repo/backend-common/config");
import * as jwt from 'jsonwebtoken'


export const authMiddleware=(req: Request, res:Response, next: NextFunction) => {
        // @ts-ignore
        const token = req.header["authorization"].split(" ")[1] ?? "";
        try {
            const decoder = jwt.verify(token, jwt_token);
            if(!decoder) {
                return res.status(401)
            }
            // @ts-ignore
            req.userId = decoder.userId
            next()

        }catch(err) {
            return res.status(500).json({
                msg : "unable to authorized the user"
            })
        }

}