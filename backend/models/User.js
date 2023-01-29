import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    picture: {
        type: String,
        default: ""
    },
    gamesPlayed: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User