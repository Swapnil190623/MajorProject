import mongoose from "mongoose";

const hoursWorkedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }, // id of the user

  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  }, // Reference to Task ID

  startTime: {
    type: Date,
  },

  endTime: {
    type: Date,
  },

  duration: {
    type: Number,
    required: true,
    default: 0,
  }, // Duration in hours or minutes
});

export const HoursWorked = mongoose.model("HoursWorked", hoursWorkedSchema);
