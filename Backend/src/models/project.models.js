import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId, //id of the project owner
      required: true,
      ref: "User", // Referencing the User model
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId, //id of the person who assigned the project
      ref: "User",
      required: true,
    },

    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId, // IDs of team members
        ref: "User",
      },
    ], // Array of Firebase uids for team members

    projectType: {
      type: String,
    },

    budget: {
      type: Number,
      required: true,
    },

    noOfTasks: {
      type: Number,
      default: 0,
    },

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId, // moongose ID
      ref: "Invoice",
    },

    progress: {
      type: Number,
      default: 0,
    }, // Percentage or similar
  },
  { timestamps: true }
);


projectSchema.pre('save', async function(next) {
  const assignerExists = await User.exists({ _id: this.assignedBy });
  if (!assignerExists) {
    throw new ApiError(400, 'Assigned user does not exist.');
  }

  for (let memberId of this.teamMembers) {
    const memberExists = await User.exists({ _id: memberId });
    if (!memberExists) {
      throw new ApiError(400, `User with ID ${memberId} does not exist.`);
    }
  }

  next();
});


export const Project = mongoose.model("Project", projectSchema);
