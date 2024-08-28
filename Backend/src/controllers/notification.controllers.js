import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.models.js"


const createNotification = asyncHandler(async (req, res) => {

});

const getNotificationByUser = asyncHandler(async (req, res) => {

});

const markNotificationAsRead = asyncHandler(async (req, res) => {

});

const deleteNotification = asyncHandler(async (req, res) => {

});


export {
    createNotification,
    getNotificationByUser,
    markNotificationAsRead,
    deleteNotification,
}