"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "wefghjhkyuehjefketrkug";
const authenticatejwt = (req, res, next) => {
    const authheaders = req.headers.authorization;
    if (authheaders) {
        const token = authheaders.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401);
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
        });
    }
};
exports.authenticatejwt = authenticatejwt;
