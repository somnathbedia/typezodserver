import User from "../models/users.models"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import environment from "dotenv";
import z, { number } from "zod";
import { log } from "console";
environment.config();
const secretKey: string = process.env.SECRET_KEY || "wefghjhkyuehjefketrkug";

const createUserSchema = z.object({
    username: z.string().min(3).max(60),
    email: z.string().max(40),
    password: z.string().min(6).max(10)
})



export const handleSignup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
   
    
    try {

        const userData = createUserSchema.parse(req.body);
       
        
        const user = await User.findOne({ email:userData.email });
        
        
        if (user) {
            res.status(401).json({ message: "user already exist" })
        } else {
            const newUser = new User({ username, email, password });
            await newUser.save();
            const token = jwt.sign({ _id: newUser._id, role: "user" }, secretKey, { expiresIn: "1h" });
            res.json({ message: "User created successfully", token });
           
        }
    } catch (error) {
        console.log("wrong input types");
        res.json({message:"Thre is error in types"})
    }
}

export const handleSignin = async(req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        const token = jwt.sign({ _id: user._id, role: "user" }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ message: "User logged in successfully",token });
    } else {
        return res.status(401).json({ message: "Invalid credential" });
    }
}