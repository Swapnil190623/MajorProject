import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.models.js"
import { Invoice } from "../models/invoice.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createProject = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        assignedBy, // client id
        teamMembers, // team members ids
        projectType,
        budget,
        deadline,
        status,
        progress
    } = req.body;

    if (!name || !description || !assignedBy || !budget || !deadline) {
        throw new ApiError(400, 'Please provide all required fields.');
    }

    // Check if the project name already exists
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
        throw new ApiError(400, 'A project with this name already exists.');
    }

    const project = await Project.create({
        name,
        description,
        projectType,
        owner : req.user._id,
        assignedBy,
        teamMembers,
        budget,
        status: status || 'pending',
        progress: progress || 0,
    });

    return res
    .status(201)
    .json(new ApiResponse(201, project, 'Project created successfully.'));
});


const getAllProjects = asyncHandler(async (req, res) => {
    const { role, _id } = req.user; // Assuming `req.user` contains the authenticated user's info

    let projects;

    if (role === 'client') {
        projects = await Project.find({ assignedBy: _id });
    } 
    else if (role === 'freelancer') {
        projects = await Project.find({ owner: _id });
    } 
    else {
        throw new ApiError(403, 'Unauthorized access');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, projects, 'Projects retrieved successfully.')); 
});


const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project retrieved successfully.'));
});


const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { description, projectType, budget, deadline } = req.body;

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            $set : {
                description,
                projectType,
                budget,
                deadline
            }
        },
        { new: true }
    );

    if(!project) {
        throw new ApiError(404, 'Project not found');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project updated successfully.'));
});


const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project deleted successfully'));
});


const assignTeamMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { teamMembers } = req.body; // Array of team member IDs

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Ensure all team members are valid users
    for (const memberId of teamMembers) {
        const user = await User.findById(memberId);
        if (!user) {
            throw new ApiError(404, `User with ID ${memberId} not found`);
        }
    }

    project.teamMembers.push(...teamMembers);

    await project.save();

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Team members assigned successfully.'));
});


// const updateProjectProgress = asyncHandler(async (req, res) => {
// }); // done this in task 


const generateInvoice = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { status } = req.body

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Placeholder logic for generating an invoice
    const invoice = await Invoice.create({
        projectId : projectId,
        client : project.assignedBy,
        totalAmount: project.budget,
        date: new Date(),
        status : status || "unpaid"
    });

    project.invoice = invoice._id;
    await project.save();

    return res
    .status(201)
    .json(new ApiResponse(201, invoice, 'Invoice generated successfully.'));
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