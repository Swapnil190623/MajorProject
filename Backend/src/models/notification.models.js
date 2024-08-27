import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
    userId: { 
        type: String, // Firebase uid of the user
        required: true 
    },

    title: { 
        type: String, 
        required: true 
    },

    message: { 
        type: String, 
        required: true 
    },

    isRead: { 
        type: Boolean, 
        default: false 
    },
  },
  { 
    timestamps: true 
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);