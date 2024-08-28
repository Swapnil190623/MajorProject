import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.models.js"


const createTask = asyncHandler(async (req, res) => {

});

const getTasksByProject = asyncHandler(async (req, res) => {

});

const getTaskById = asyncHandler(async (req, res) => {

});

const updateTask = asyncHandler(async (req, res) => {

});

const deleteTask = asyncHandler(async (req, res) => {

});

const assignTask = asyncHandler(async (req, res) => {

});

const updateTaskStatus = asyncHandler(async (req, res) => {

});


export {
    createTask,
    getTasksByProject,
    getTaskById,
    updateTask,
    deleteTask,
    assignTask, 
    updateTaskStatus,
}