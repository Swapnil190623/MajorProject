import { Router } from 'express';
import {
    logHoursWorked,
    getHoursByTask,
    getHoursByUser,
    updateLoggedHours,
    deleteLoggedHours,
} from '../controllers/hoursWorked.controllers.js';
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.post('/log', logHoursWorked);
router.get('/task/:taskId', getHoursByTask);
router.get('/user/:userId', getHoursByUser);
router.patch('/update/:id', updateLoggedHours);
router.delete('/delete/:id', deleteLoggedHours);


export default router