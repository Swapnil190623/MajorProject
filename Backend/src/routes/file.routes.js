import { Router } from 'express';

import {
    uploadFile,
    getFileById,
    getFilesByProject,
    deleteFile,
} from "../controllers/file.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/upload-file/:projectId").post(uploadFile);

router.route("/get-file/:projectId").get(getFilesByProject);

router.route("/:fileId")
.get(getFileById)
.delete(deleteFile);


export default router