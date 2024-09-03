import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/file.models.js"


// Multer configuration in your route
// upload.array('files') should be used in the route that handles file uploads
const uploadFile = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const uploadedBy = req.user._id;

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "No files uploaded");
    }

    const uploadedFiles = [];

    for (const file of req.files) {
        // Upload file to Cloudinary
        const result = await uploadOnCloudinary(file.path);

        // Create file record in the database
        const newFile = await File.create({
            file: result.secure_url,
            name: file.originalname,
            fileType: file.mimetype,
            date: new Date(),
            size: file.size,
            projectId,
            uploadedBy,
        });

        uploadedFiles.push(newFile);
    }

    return res
    .status(201)
    .json(new ApiResponse(201, uploadedFiles, "Files uploaded successfully"));
}); // done


const getFilesByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
  
    const files = await File.find({ projectId });
  
    if (!files || files.length === 0) {
      throw new ApiError(404, "No files found for this project");
    }
  
    return res
    .status(200)
    .json(new ApiResponse(200, files, "Files fetched successfully"));
}); // done


const getFileById = asyncHandler(async (req, res) => {
    const { fileId } = req.params;
  
    const file = await File.findById(fileId);
  
    if (!file) {
      throw new ApiError(404, "File not found");
    }
  
    return res.status(200).json(new ApiResponse(200, file, "File fetched successfully"));
}); // done


const deleteFile = asyncHandler(async (req, res) => {
    const { fileId } = req.params;
  
    const file = await File.findById(fileId);
  
    if (!file) {
      throw new ApiError(404, "File not found");
    }
  
    // Check if the user requesting the delete is the one who uploaded the file
    if (file.uploadedBy.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this file");
    }
  
    // Delete the file from Cloudinary
    const deletionResult = await cloudinary.uploader.destroy(file.publicId);
  
    if (deletionResult.result !== 'ok') {
      throw new ApiError(500, "Failed to delete file from Cloudinary");
    }
  
    await File.findByIdAndDelete(fileId);
  
    return res
    .status(200)
    .json(new ApiResponse(200, null, "File deleted successfully"));
}); // done


export {
    uploadFile,
    getFileById,
    getFilesByProject,
    deleteFile,
}