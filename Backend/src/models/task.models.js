import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId, //Reference to ProjectID
      ref: "Project",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: { type: String },

    dueDate: { type: Date, required: true },

    taskstatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, // ref to users
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
