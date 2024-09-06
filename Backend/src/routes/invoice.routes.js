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

router.route("/generate-invoice/:projectId").post(generateInvoice);

router
  .route("/:invoiceId")
  .get(getInvoiceById)
  .patch(updateInvoice)
  .delete(deleteInvoice);

router.route("/:projectId").get(getInvoiceByProject);

router.route("/mark-as-paid/:invoiceId").patch(markInvoiceAsPaid);

export default router;
