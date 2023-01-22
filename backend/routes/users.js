import express from "express"
import {
    getUser,
    getUserGames,
    addRemoveGame
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/:id/games", verifyToken, getUserGames)

router.patch("/:id/:gameId", verifyToken, addRemoveGame)

export default router