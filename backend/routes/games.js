import express from "express"
import { importGames, getFeedGames, getGame } from "../controllers/games.js"
// getFeedGames, getUserGames, rateGame, commentGame
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// IMPORT
router.post("/import", importGames)

// READ
router.get("/", getFeedGames)
router.get("/:apiId", getGame)

// UPDATE
// router.patch("/:id/rate", verifyToken, rateGame)
// router.patch("/:id/comment", verifyToken, commentGame)

export default router