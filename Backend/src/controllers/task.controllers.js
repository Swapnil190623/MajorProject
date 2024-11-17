import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.models.js";
import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";

const createTask = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description, dueDate, priority, assignedTo } = req.body;

  if ([name, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name and description are required.");
  }

  // Validate that the project exists
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  // Validate assignedTo user exists
  if (assignedTo) {
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      throw new ApiError(404, "Assigned user not found.");
    }
  }

  const task = await Task.create({
    projectId: projectId,
    name,
    description,
    dueDate: dueDate ? new Date(dueDate) : null, // Ensure dueDate is a valid date
    taskStatus: "pending",
    priority: priority || "medium",
    assignedTo: assignedTo || null,
    owner: req.user._id,
  });

  if (!task) {
    throw new ApiError(400, "Failed to create task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task created successfully"));
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ $or:[{assignedTo: req.user._id}, {owner: req.user._id}] });

  if (tasks.length == 0) {
    throw new ApiError(404, "No Tasks found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
}); // taks that has been assigned to you by someone else .

const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ projectId });

  if (!tasks.length) {
    throw new ApiError(404, "No tasks found for this project.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrieved successfully."));
}); // all tasks of the project.

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(400, "No task found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task retrieved successfully"));
}); //gets a single task

// only freelancer can update task
const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { name, description, dueDate, priority, assignedTo } = req.body;

  // Validate assignedTo user exists
  if (assignedTo) {
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      throw new ApiError(404, "Assigned user not found.");
    }
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        assignedTo,
      },
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(400, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const assignTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { assignedTo } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.assignedTo = assignedTo;
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task assigned successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  // Find the task by ID
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  // Check if the task has been assigned to anyone
  if (task.assignedTo) {
    // Check if the current user is the one who created the task
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      throw new ApiError(
        403,
        "You do not have permission to delete this task."
      );
    }
  } else {
    // If the task is not assigned to anyone, allow the delete operation
    console.warn("Task is not assigned to anyone.");
  }

  // Proceed to delete the task if the user is authorized
  await Task.findByIdAndDelete(taskId);

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task deleted successfully."));
}); // delete a single task

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "in-progress", "completed"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid task status.");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  task.taskStatus = status;
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully."));
});

export {
  createTask,
  getAllTasks,
  getTasksByProject,
  getTaskById,
  updateTask,
  assignTask,
  deleteTask,
  updateTaskStatus,
};
