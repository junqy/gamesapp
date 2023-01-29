import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    toUserId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Notification = mongoose.model("Notification", NotificationSchema)

export default Notification