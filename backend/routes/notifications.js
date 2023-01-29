import express from "express"
import { createNotification, deleteNotification, getUserNotifications } from "../controllers/notifications.js"
//import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", createNotification)
router.delete("/:id", deleteNotification)
router.get("/:toUserId", getUserNotifications)


export default router