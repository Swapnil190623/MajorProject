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

    dueDate: { type: Date },

    taskStatus: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, // ref to users
      // required: true,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //id of the project owner
      required: true,
      ref: "User", // Referencing the User model
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
