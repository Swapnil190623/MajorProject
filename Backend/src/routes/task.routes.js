import { Router } from 'express';
import {
    createTask,
    getAllTasks,
    getTasksByProject,
    getTaskById,
    updateTask,
    assignTask,
    deleteTask, 
    updateTaskStatus,
} from '../controllers/task.controllers'
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/")
.get(getAllTasks)
.post(createTask)

router.route("/get-task/:projectId")
.get(getTasksByProject)

router.route("/:taskId")
.get(getTaskById)
.patch(updateTask)
.delete(deleteTask)

router.route("/update/assign-task/:taskId")
.patch(assignTask)

router.route("/update/task-status/:taskId")
.patch(updateTaskStatus)


export default router