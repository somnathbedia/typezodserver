import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import environment from "dotenv";

environment.config();
const databaseuri = process.env.DATABASE_URI || "linktoyourdatabase";
const app = express();



app.use(express.json());
app.use("/user", userRoutes);


mongoose.connect(databaseuri, { dbName: "typescript" }).then(() => {
    console.log("database connection successfully");
}).catch((err) => {
    if (err) {
        console.log("Failed to connect")
    }
})

app.listen(6000, () => {
    console.log("server is running");
    
})