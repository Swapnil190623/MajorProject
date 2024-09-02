import { Router } from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignTeamMembers,
    updateProjectProgress,
    generateInvoice,
} from '../controllers/project.controllers.js'
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/")
.get(getAllProjects)
.post(createProject);

router.route("/:projectId")
.get(getProjectById)
.patch(updateProject)
.delete(deleteProject)

router.route("/assign/team-members/:projectId")
.patch(assignTeamMembers)

router.route("/update/project-progress/:projectId")
.patch(updateProjectProgress)

router.route("/generate/invoice/:projectId").post(generateInvoice)

export default router