import { Router } from 'express';
import {
    createInvoice,
    getInvoiceById,
    getInvoiceByProject,
    updateInvoice,
    deleteInvoice,
    markInvoiceAsPaid,
} from "../controllers/invoice.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/").post(createInvoice)

router.route("/:invoiceId")
.get(getInvoiceById)
.patch(updateInvoice)
.delete(deleteInvoice)

router.route("/mark-as-paid/:invoiceId").patch(markInvoiceAsPaid)

export default router