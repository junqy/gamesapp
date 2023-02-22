import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const createComment = async (req, res) => {
    try {
        const { userId, gameId, content } = req.body;
        const user = await User.findById(userId);
        const newComment = new Comment({
            username: user.username,
            picture: user.picture,
            userId,
            gameId,
            content,
            likes: {},
        });
        await newComment.save();
        const comments = await Comment.find({gameId})
        res.status(201).json(comments);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getGameComments = async (req, res) => {
    try {
        const { gameId } = req.params;
        const comments = await Comment.find({ gameId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        const deletedComment = await comment.remove();
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const likeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const comment = await Comment.findById(id)
        const isLiked = comment.likes.get(userId)

        if (isLiked) {
            comment.likes.delete(userId);
        } else {
            comment.likes.set(userId, true)
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { likes: comment.likes },
            {new : true}
        )

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}