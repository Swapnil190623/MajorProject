import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createProject = asyncHandler(async (req, res) => {

});

const getAllProjects = asyncHandler(async (req, res) => {

});

const getProjectById = asyncHandler(async (req, res) => {

});

const updateProject = asyncHandler(async (req, res) => {

});

const deleteProject = asyncHandler(async (req, res) => {

});

const assignTeamMembers = asyncHandler(async (req, res) => {

});

const updateProjectProgress = asyncHandler(async (req, res) => {

});

const generateInvoice = asyncHandler(async (req, res) => {

});


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignTeamMembers,
    updateProjectProgress,
    generateInvoice,
}