import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.models.js"


const createNotification = asyncHandler(async (req, res) => {
    const { userId, title, message } = req.body;

    if (!userId || !title || !message) {
        throw new ApiError(400, "User ID, title, and message are required.");
    }

    const notification = await Notification.create({
        userId,
        title,
        message,
    });

    return res
    .status(201)
    .json(new ApiResponse(201, notification, "Notification created successfully"));
});


const getNotificationByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    if (!notifications || notifications.length === 0) {
        throw new ApiError(404, "No notifications found for this user.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});


const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, notifications, 'Notifications retrieved successfully.'));
});


const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification marked as read successfully"));
});


const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
        throw new ApiError(404, "Notification not found.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification deleted successfully"));
});


export {
    createNotification,
    getNotificationByUser,
    getNotifications,
    markNotificationAsRead,
    deleteNotification,
}