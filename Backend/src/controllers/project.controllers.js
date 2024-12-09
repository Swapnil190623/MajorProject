import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js"
import { File } from "../models/file.models.js"
import { Task } from "../models/task.models.js"
import { Invoice } from "../models/invoice.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { mongoose } from "mongoose";
import { Notification } from "../models/notification.models.js"


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

     // Validate deadline date
    //  if (!moment(deadline, moment.ISO_8601, true).isValid()) {
    //     throw new ApiError(400, 'Invalid date format for deadline.');
    // }

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
        deadline:new Date(deadline),
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
        .populate('teamMembers', 'username email avatar') // Populate only the required fields
        .exec();

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

      // Check if the deadline is in the past
      if (deadline && new Date(deadline) <= new Date()) {
        throw new ApiError(400, 'The deadline must be a future date.');
    }

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
    // const file = await File.find({ projectId : projectId })

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project deleted successfully'));
});


const assignTeamMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { teamMembers } = req.body; // Array of team member emails\

    // console.log("Request Body:", req.body);

    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
        throw new ApiError(400, "Invalid input: 'teamMembers' must be a non-empty array.");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Find users by email
    const users = await User.find({ email: { $in: teamMembers } });

     if (users.length !== teamMembers.length) {
        // Handle missing users
        const missingMembers = teamMembers.filter(
            (member) => !users.some((user) => user.email === member)
        );
        throw new ApiError(404,`The following members were not found: ${missingMembers.join(', ')}`);
    }
 
    // Extract user IDs
    const userIds = users.map((user) => user._id);
    // console.log(userIds);
 
    // Add unique IDs to the project's teamMembers array
    project.teamMembers = [...new Set([...project.teamMembers, ...userIds])];

    await project.save();

    // Notify the project owner
    await Notification.create({
        userId: project.owner,
        title: "Member Added",
        message: `Team members were added to your project "${project.name}".`
    });

    // Notify each team member
    for (const userId of userIds) {
        await Notification.create({
            userId,
            title: "You are added",
            message: `You have been added to the project "${project.name}".`
        });
    }

    return res
    .status(200)
    .json(new ApiResponse(200, project, 'Team members assigned successfully.'));
});


const updateProjectProgress = asyncHandler(async (req, res) => {
    // Find the associated project and update progress

  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

 //   const totalTasks = await Task.countDocuments({ projectId: project._id });
  const totalTasks = project.noOfTasks;
  const completedTasks = await Task.countDocuments({ projectId : projectId, taskStatus: 'completed' });
  const pendingTasks = await Task.countDocuments({ projectId : projectId, taskStatus: 'pending' });
  const inProgressTasks = await Task.countDocuments({ projectId : projectId, taskStatus: 'in-progress' });

    //   console.log(totalTasks, completedTasks)

  const progressInPercentage = Math.round((completedTasks / totalTasks) * 100); // (5 / 10) * 100 = 50%
    //   console.log(progress)
      
    //   project.progress = progress;

  if (progressInPercentage === 100) {
    project.status = 'completed';
  } 
  else if (progressInPercentage > 0) {
    project.status = 'in-progress';
  }

  const progress = {
    progressInPercentage,
    completedTasks,
    pendingTasks,
    inProgressTasks
  }

    //   await project.save();

  return res
  .status(200)
  .json(new ApiResponse(200, progress, "Project progress updated successfully"))
});


// const generateInvoice = asyncHandler(async (req, res) => {
//     const { projectId } = req.params;
//     const { status } = req.body

//      // Validation for required fields
//     //  if (!clientId) {
//     //     throw new ApiError(400, 'clientId is required.');
//     // }

//     const project = await Project.findById(projectId);
//     if (!project) {
//         throw new ApiError(404, 'Project not found');
//     }

//     // Placeholder logic for generating an invoice
//     const invoice = await Invoice.create({
//         projectId : projectId,
//         clientId:project.assignedBy,
//         // clientId :  new mongoose.Types.ObjectId(project.assignedBy),//chage made
//         totalAmount: project.budget,
//         date: new Date(),
//         status : status || "unpaid"
//     });

//     project.invoice = invoice._id;
//     await project.save();

//     return res
//     .status(201)
//     .json(new ApiResponse(201, invoice, 'Invoice generated successfully.'));
// }); // replace this code in invoice controller.


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignTeamMembers,
    updateProjectProgress,
    
}