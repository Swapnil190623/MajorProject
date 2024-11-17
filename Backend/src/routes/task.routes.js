import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTasksByProject,
  getTaskById,
  updateTask,
  assignTask,
  deleteTask,
  deleteTaskByProjectId,
  updateTaskStatus,
} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:projectId").post(createTask); // testing - Done

router.route("/").get(getAllTasks); // testing - Done .

router.route("/get-task/:projectId").get(getTasksByProject); // testing - Done

router
  .route("/:taskId")
  .get(getTaskById) // testing - Done
  .patch(updateTask) //testing-Done
  .delete(deleteTask); //testing-Done

router.route("/delete-by-project-id/:projectId").delete(deleteTaskByProjectId);

router.route("/update/assign-task/:taskId").patch(assignTask); // remaining

router.route("/update/task-status/:taskId").patch(updateTaskStatus); //testing - Done

export default router;
