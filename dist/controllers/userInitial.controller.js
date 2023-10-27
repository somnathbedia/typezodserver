"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignin = exports.handleSignup = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "wefghjhkyuehjefketrkug";
const createUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(60),
    email: zod_1.default.string().max(40),
    password: zod_1.default.string().min(6).max(10)
});
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const userData = createUserSchema.parse(req.body);
        const user = yield users_models_1.default.findOne({ email: userData.email });
        if (user) {
            res.status(401).json({ message: "user already exist" });
        }
        else {
            const newUser = new users_models_1.default({ username, email, password });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ _id: newUser._id, role: "user" }, secretKey, { expiresIn: "1h" });
            res.json({ message: "User created successfully", token });
        }
    }
    catch (error) {
        console.log("wrong input types");
        res.json({ message: "Thre is error in types" });
    }
});
exports.handleSignup = handleSignup;
const handleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield users_models_1.default.findOne({ username });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: "user" }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ message: "User logged in successfully", token });
    }
    else {
        return res.status(401).json({ message: "Invalid credential" });
    }
});
exports.handleSignin = handleSignin;
