import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    }, // Reference to Project ID

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // id of the client

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);

// TODO : consider adding logo of client or freelancer or e-signature
