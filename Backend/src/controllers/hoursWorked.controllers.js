import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HoursWorked } from "../models/hoursWorked.models.js"


const logHoursWorked = asyncHandler(async (req, res) => {

});

const getHoursByTask = asyncHandler(async (req, res) => {

});

const getHoursByUser = asyncHandler(async (req, res) => {

});

const updateLoggedHours = asyncHandler(async (req, res) => {

});

const deleteLoggedHours = asyncHandler(async (req, res) => {

});


export {
    logHoursWorked,
    getHoursByTask,
    getHoursByUser,
    updateLoggedHours,
    deleteLoggedHours,
}