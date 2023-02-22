import mongoose from "mongoose"

const GameSchema = new mongoose.Schema({
    apiId: {
        type: String,
        required: true
    },
    ratings: {
        type: Map,
        of: String
    }
}, { timestamps: true })

const Game = mongoose.model("Game", GameSchema)

export default Game