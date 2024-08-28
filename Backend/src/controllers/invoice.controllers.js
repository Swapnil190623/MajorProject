import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Invoice } from "../models/invoice.models.js"


const createInvoice = asyncHandler(async (req, res) => {

});

const getInvoiceByProject = asyncHandler(async (req, res) => {

});

const getInvoiceById = asyncHandler(async (req, res) => {

});

const updateInvoice = asyncHandler(async (req, res) => {

});

const deleteInvoice = asyncHandler(async (req, res) => {

});

const markInvoiceAsPaid = asyncHandler(async (req, res) => {

});


export {
    createInvoice,
    getInvoiceById,
    getInvoiceByProject,
    updateInvoice,
    deleteInvoice,
    markInvoiceAsPaid,
}