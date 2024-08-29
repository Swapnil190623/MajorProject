import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.models.js"
import { Project } from "../models/project.models.js"


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

// Mark a Task as Completed and Update Project Progress
const completeTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  // Find the task and mark it as completed
  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, 'Task not found');
  
  task.status = 'completed';
  await task.save();

  // Find the associated project and update progress
  const project = await Project.findById(task.projectId);
  if (!project) throw new ApiError(404, 'Project not found');

  const totalTasks = await Task.countDocuments({ projectId: project._id });
  const completedTasks = await Task.countDocuments({ projectId: project._id, status: 'completed' });

  const progress = (completedTasks / totalTasks) * 100; // (5 / 10) * 100 = 50%
      
  project.progress = progress;

  if (progress === 100) {
    project.status = 'completed';
  } 
  else if (progress > 0) {
    project.status = 'in-progress';
  }

  return res
  .status(200)
  .json(new ApiResponse(200, project, 'Task completed and project progress updated'));
});


export {
    createTask,
    getTasksByProject,
    getTaskById,
    updateTask,
    deleteTask,
    assignTask, 
    updateTaskStatus,
    completeTask,
}