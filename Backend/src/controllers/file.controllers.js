import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/file.models.js"


const uploadFile = asyncHandler(async (req, res) => {

});

const getFilesByProject = asyncHandler(async (req, res) => {

});

const getFileById = asyncHandler(async (req, res) => {

});

const deleteFile = asyncHandler(async (req, res) => {

});


export {
    uploadFile,
    getFileById,
    getFilesByProject,
    deleteFile,
}