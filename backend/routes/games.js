import express from "express"
import { importGames, getFeedGames, getGame, rateGame } from "../controllers/games.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// IMPORT
router.post("/import", importGames)

// READ
router.get("/", getFeedGames)


router.get("/:apiId", getGame)

// UPDATE
router.patch("/:apiId/rate", verifyToken, rateGame)

export default router