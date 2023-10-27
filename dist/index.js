"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_1.default);
mongoose_1.default.connect("mongodb+srv://somnathswd:Ik4v7BuePt8uPm4n@cluster0.z10zgei.mongodb.net/?retryWrites=true&w=majority", { dbName: "typescript" }).then(() => {
    console.log("database connection successfully");
}).catch((err) => {
    if (err) {
        console.log("Failed to connect");
    }
});
app.listen(6000, () => {
    console.log("server is running");
});
