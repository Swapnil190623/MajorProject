import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        file : {
            type: String, // cloudinary url
            required: true
        },

        name: { 
            type: String, 
            required: true 
        },

        fileType: { 
            type: String, 
            required: true 
        }, // e.g., 'pdf', 'image', etc.

        date: { 
            type: Date, 
            required: true 
        },

        size: { 
            type: Number, 
            required: true 
        }, // Size in bytes

        projectId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Project",
            required: true 
        }, // Reference to Project ID

        uploadedBy: { 
            type: String, // Firebase uid of the uploader
            ref: "User",
            required: true 
        }, 
    },
    { 
        timestamps: true 
    }
);

export const File = mongoose.model("File", fileSchema);

  