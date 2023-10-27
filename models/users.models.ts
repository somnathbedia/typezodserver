import mongoose from "mongoose"


interface usserInputs {
    username: String,
    email: String,
    password:String
}


const userSchema = new mongoose.Schema<usserInputs>({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

export default mongoose.model("User", userSchema);