import { Router } from 'express';
import {
    createNotification,
    getNotificationByUser,
    getNotifications,
    markNotificationAsRead,
    deleteNotification,
} from "../controllers/notification.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/").post(createNotification)

router.route("/:userId").get(getNotificationByUser)

router.route("/get-notification").get(getNotifications)

router.route("/:notificationId")
.patch(markNotificationAsRead)
.delete(deleteNotification)


export default router



