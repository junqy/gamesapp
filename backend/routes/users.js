import express from "express"
import {
    getUser,
    getUserGames,
    addRemoveGame,
    getUserFriends,
    addRemoveFriend,
    updatePicture,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", getUser)
router.get("/:id/games", getUserGames)
router.get("/:id/friends", getUserFriends)

router.patch("/picture/:id", updatePicture)
router.patch("/games/:id/:apiId", verifyToken, addRemoveGame)
router.patch("/friends/:id/:friendId", verifyToken, addRemoveFriend)


export default router