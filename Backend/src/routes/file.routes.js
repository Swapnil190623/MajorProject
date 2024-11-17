import { Router } from 'express';

import {
    uploadFile,
    getFileById,
    getAllFiles,
    getFilesByProject,
    deleteFile,
    deleteFilesByProjectId,
} from "../controllers/file.controllers.js"


import { upload } from "../middlewares/multer.middlewares.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.post('/upload-file/:projectId', upload.array('file'), uploadFile);//testing-Done

router.route('/').get(getAllFiles);

router.route("/get-file/:projectId")
.get(getFilesByProject); //testing - Done 

router.route("/:fileId")
.get(getFileById) // testing-Done
.delete(deleteFile); // testing-Done

router.route("/delete-by-project-id/:projectId").delete(deleteFilesByProjectId);


export default router