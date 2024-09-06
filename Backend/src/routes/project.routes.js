import { Router } from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignTeamMembers,
    updateProjectProgress,
    
} from '../controllers/project.controllers.js'
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/")
.get(getAllProjects) // testing-Done
.post(createProject); // testing-DOne

router.route("/:projectId")
.get(getProjectById) // testing-Done
.patch(updateProject)//testing-Done
.delete(deleteProject)

router.route("/assign/team-members/:projectId")
.patch(assignTeamMembers) // route is working

router.route("/update/project-progress/:projectId")
.patch(updateProjectProgress) // route is working

// router.route("/generate/invoice/:projectId")
// .post(generateInvoice) // testing-Done

export default router