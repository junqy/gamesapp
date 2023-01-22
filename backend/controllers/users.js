import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        rest.status(404).json({ message: err.message })
    }
}

export const getUserGames = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
    
        const games = await Promise.all(
            user.gamesPlayed.map((id) => User.findById(id))
        )
        res.status(200).json(games)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addRemoveGame = async (req, res) => {
    try {
        const { id, gameId } = req.params

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}