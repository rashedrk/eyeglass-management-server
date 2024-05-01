import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SalesControllers } from "./sales.controller";
import { SalesValidation } from "./sales.validation";


const router = Router();

router.post(
    '/create',
    validateRequest(SalesValidation.salesValidationSchema),
    SalesControllers.createSales
)
router.get(
    '/:type',
    SalesControllers.getSales
)

export const SalesRoutes = router;