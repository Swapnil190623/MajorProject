import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HoursWorked } from "../models/hoursWorked.models.js"


const logHoursWorked = asyncHandler(async (req, res) => {
    const { userId, taskId, startTime, endTime } = req.body;

    if (!userId || !taskId || !startTime || !endTime) {
        throw new ApiError(400, "User ID, Task ID, Start Time, and End Time are required.");
    }

    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // Duration in hours

    const hoursWorked = await HoursWorked.create({
        userId,
        taskId,
        startTime,
        endTime,
        duration,
    });

    return res
    .status(201)
    .json(new ApiResponse(201, hoursWorked, "Hours logged successfully"));
});


const getHoursByTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    const hours = await HoursWorked.find({ taskId }).populate("userId", "name").sort({ startTime: -1 });

    if (!hours || hours.length === 0) {
        throw new ApiError(404, "No hours logged for this task.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, hours, "Hours fetched successfully"));
});


const getHoursByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const hours = await HoursWorked.find({ userId }).populate("taskId", "name").sort({ startTime: -1 });

    if (!hours || hours.length === 0) {
        throw new ApiError(404, "No hours logged by this user.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, hours, "Hours fetched successfully"));
});


const updateLoggedHours = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime } = req.body;

    const hoursWorked = await HoursWorked.findById(id);

    if (!hoursWorked) {
        throw new ApiError(404, "Hours record not found.");
    }

    if (startTime) {
        hoursWorked.startTime = startTime;
    }
    if (endTime) {
        hoursWorked.endTime = endTime;
        hoursWorked.duration = (new Date(endTime) - new Date(startTime || hoursWorked.startTime)) / (1000 * 60 * 60); // Update duration
    }

    await hoursWorked.save();

    return res
    .status(200)
    .json(new ApiResponse(200, hoursWorked, "Hours updated successfully"));
});


const deleteLoggedHours = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const hoursWorked = await HoursWorked.findByIdAndDelete(id);

    if (!hoursWorked) {
        throw new ApiError(404, "Hours record not found.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, hoursWorked, "Hours deleted successfully"));
});


export {
    logHoursWorked,
    getHoursByTask,
    getHoursByUser,
    updateLoggedHours,
    deleteLoggedHours,
}