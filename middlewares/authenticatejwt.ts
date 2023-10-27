import { NextFunction, Request, Response } from "express";
import environment from "dotenv";
import jwt from "jsonwebtoken";
environment.config();
const secretKey: string = process.env.SECRET_KEY || "wefghjhkyuehjefketrkug";

export const  authenticatejwt = (req: Request, res: Response, next: NextFunction) => {
    const authheaders = req.headers.authorization;
    if (authheaders) {
        const token = authheaders.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401)
            }
            if (!user) {
                return res.sendStatus(403);
            }

            if (typeof user === "string") {
                return res.sendStatus(403);
            }

            if (typeof user === "undefined") {
                return res.sendStatus(403);
            } 

            
            req.headers["userId"] = user._id;
            next();
        })
    }
}