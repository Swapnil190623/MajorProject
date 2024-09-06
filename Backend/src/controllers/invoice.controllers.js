import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Invoice } from "../models/invoice.models.js"


const generateInvoice = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { status } = req.body

     // Validation for required fields
    //  if (!clientId) {
    //     throw new ApiError(400, 'clientId is required.');
    // }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Placeholder logic for generating an invoice
    const invoice = await Invoice.create({
        projectId : projectId,
        clientId:project.assignedBy,
        // clientId :  new mongoose.Types.ObjectId(project.assignedBy),//chage made
        totalAmount: project.budget,
        date: new Date(),
        status : status || "unpaid"
    });

    project.invoice = invoice._id;
    await project.save();

    return res
    .status(201)
    .json(new ApiResponse(201, invoice, 'Invoice generated successfully.'));
});

const getInvoiceByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const invoices = await Invoice.find({ projectId });

    if (!invoices) {
        throw new ApiError(404, "No invoices found for this project");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Invoices retrieved successfully", invoices));
});


const getInvoiceById = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Invoice retrieved successfully", invoice));
});


const updateInvoice = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params;
    const { date, totalAmount, status } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        { date, totalAmount, status },
        { new: true }
    );

    if (!updatedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Invoice updated successfully", updatedInvoice));
});


const deleteInvoice = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params;

    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
        throw new ApiError(404, "Invoice not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Invoice deleted successfully", deletedInvoice));
});


const markInvoiceAsPaid = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found");
    }

    if (invoice.status === "paid") {
        throw new ApiError(400, "Invoice is already marked as paid");
    }

    invoice.status = "paid";
    await invoice.save();

    return res
    .status(200)
    .json(new ApiResponse(200, "Invoice marked as paid", invoice));
});


export {
    generateInvoice,
    getInvoiceById,
    getInvoiceByProject,
    updateInvoice,
    deleteInvoice,
    markInvoiceAsPaid,
}