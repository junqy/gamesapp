import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
    try {
        const { username, toUserId } = req.body;
        const newNotification = new Notification({
            username,
            toUserId,
        });
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getUserNotifications = async (req, res) => {
    try {
        const { toUserId } = req.params;
        const notifications = await Notification.find({ toUserId });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        const deletedNotification = await notification.remove();
        res.status(200).json(deletedNotification);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany();
        res.status(200).json("successfully deleted notifications");
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
