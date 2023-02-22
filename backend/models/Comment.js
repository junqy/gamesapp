import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        gameId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Map,
            of: Boolean,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
