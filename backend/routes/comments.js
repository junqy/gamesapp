import express from "express";
import {
    createComment,
    getGameComments,
    deleteComment,
    likeComment,
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:gameId", getGameComments);

router.delete("/:id", verifyToken, deleteComment);

router.post("/", verifyToken, createComment);

router.patch("/:id/like", verifyToken, likeComment);

export default router;
