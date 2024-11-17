import { Router } from "express";
import { 
    createSchedule,
    getAllSchedules,
    updateSchedule,
    deleteSchedule,
} from "../controllers/schedule.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/")
    .post(createSchedule)
    .get(getAllSchedules)

router.route("/:scheduleId")
    .patch(updateSchedule)
    .delete(deleteSchedule)


export default router;