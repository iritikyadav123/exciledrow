import { PassThrough } from 'stream';
import {z} from 'zod';


export const userSchema = z.object({
    username : z.string().min(3).max(20),
    Password : z.string().min(3).max(50),
    name  : z.string()
})

export const signinSchema = z.object({
    username : z.string().min(3).max(20),
    Password : z.string().min(3).max(50)
})

export const ceateRoomSchema = z.object({
    name : z.string().min(3).max(20)
})

