import mongoose from "mongoose"

const GameSchema = new mongoose.Schema({
    apiId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 2,
        max: 150
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    metacritic: {
        type: Number,
    },
    tba: {
        type: Boolean,
    },
    released: {
        type: String,
    }
}, { timestamps: true })

const Game = mongoose.model("Game", GameSchema)

export default Game