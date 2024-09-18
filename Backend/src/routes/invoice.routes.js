import { Router } from "express";
import {
  generateInvoice,
  getInvoiceById,
  getInvoiceByProject,
  updateInvoice,
  deleteInvoice,
  markInvoiceAsPaid,
} from "../controllers/invoice.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.post("/generate-invoice/:projectId", generateInvoice); // testing-Done

router.route("/:invoiceId")
.get(getInvoiceById) // testing-Done
.patch(updateInvoice) // testing-Done
.delete(deleteInvoice); // testing-Done

router.route("/projects/:projectId")
.get(getInvoiceByProject); // testing-Done

router.route("/mark-as-paid/:invoiceId").patch(markInvoiceAsPaid); // testing-Done

export default router;
