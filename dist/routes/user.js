"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInitial_controller_1 = require("../controllers/userInitial.controller");
const authenticatejwt_1 = require("../middlewares/authenticatejwt");
const router = express_1.default.Router();
router.post("/signup", userInitial_controller_1.handleSignup);
router.post("/signin", userInitial_controller_1.handleSignin);
router.get("/posts", authenticatejwt_1.authenticatejwt, (req, res) => {
    res.json({ message: "response from protected route" });
});
exports.default = router;
