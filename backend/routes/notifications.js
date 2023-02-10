import express from "express"
import { createNotification, deleteNotification, getUserNotifications, deleteAllNotifications } from "../controllers/notifications.js"
//import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", createNotification)
router.delete("/:id", deleteNotification)
router.get("/:toUserId", getUserNotifications)
router.delete("/", deleteAllNotifications)


export default router