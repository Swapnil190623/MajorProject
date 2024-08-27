import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    }, // Firebase user ID

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // password: {
    //   type: String,
    //   required: true,
    // }, // Optional, depends on if you're storing passwords locally

    avatar: {
      type: String, // cloudinary url
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["client", "freelancer"],
      required: true,
      // default: "user",
    }, // Example roles
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
