import { z } from "zod";


export const registerSchema = z
.object({

    name:z
    .string()
    .min(3,"Name must contain minimum 3 characters"),


    email:z
    .string()
    .email("Invalid email"),


    password:z
    .string()
    .min(8,"Password minimum 8 characters"),


    confirmPassword:z
    .string()


})
.refine(

(data)=>data.password===data.confirmPassword,

{
    message:"Passwords do not match",

    path:["confirmPassword"]
}

);