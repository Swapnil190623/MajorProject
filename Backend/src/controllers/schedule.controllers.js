import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Schedule } from "../models/calendar.models.js";


const createSchedule = asyncHandler(async (req, res) => {
    const { title, description, date, time } = req.body;

    if(!title || !date || !time) {
        throw new ApiError(400, "Please provide all fields");
    }

    const schedule = await Schedule.create({
        title,
        description,
        date : new Date(date),
        time : time,
        owner : req.user._id,
    });

    return res
    .status(200)
    .json(new ApiResponse(200, schedule, "Schedule Added successfully"));
});


const getAllSchedules = asyncHandler(async (req, res) => {
    const schedules = await Schedule.find({ owner : req.user._id});

    if(schedules.length === 0) {
        throw new ApiError(404, "No Schedules found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, schedules, "Schedules retrieved successfully"));
});


const updateSchedule = asyncHandler(async (req, res) => {
    const { scheduleId } = req.params;
    const { title, description, date, time } = req.body;

    const schedule = await Schedule.findByIdAndUpdate(
        scheduleId,
        {
            $set : {
                title,
                description,
                date : dueDate ? new Date(dueDate) : null,
                time,
            },
        },
        { new: true }
    );

    if(!schedule) {
        throw new ApiError(400, "Schedule not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, schedule, "Schedule updated successfully"))
});


const deleteSchedule = asyncHandler(async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await Schedule.findByIdAndDelete(scheduleId);

    if(!schedule) {
        throw new ApiError(400, "Schedule not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, schedule, "Schedule deleted successfully"))
});


export {
    createSchedule,
    getAllSchedules,
    updateSchedule,
    deleteSchedule,
}