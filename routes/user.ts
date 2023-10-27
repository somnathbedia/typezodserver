import express from "express";
import { Request,Response } from "express";
import { handleSignin, handleSignup } from "../controllers/userInitial.controller";
import { authenticatejwt } from "../middlewares/authenticatejwt";
const router = express.Router();


router.post("/signup", handleSignup)
router.post("/signin", handleSignin);
router.get("/posts", authenticatejwt, (req:Request, res:Response) => {
    res.json({ message: "response from protected route" });
})

export default router;