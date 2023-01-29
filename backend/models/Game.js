import mongoose from "mongoose"

const GameSchema = new mongoose.Schema({
    apiId: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    ratings: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Game = mongoose.model("Game", GameSchema)

export default Game