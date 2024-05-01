import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EyeglassControllers } from './eyeglass.controller';
import { EyeglassValidation } from './eyeglass.validation';


const router = express.Router();

router.get(
    '/',
    EyeglassControllers.getAllEyeglasses
);
router.post(
    '/add',
    validateRequest(EyeglassValidation.eyeglassValidationSchema),
    EyeglassControllers.addEyeglass
);

router.patch(
    '/update/:id',
    validateRequest(EyeglassValidation.updateEyeglassValidationSchema),
    EyeglassControllers.updateEyeglass
);

router.delete(
    '/delete/:id',
    EyeglassControllers.deleteEyeglass
);
router.delete(
    '/bulk_delete',
    EyeglassControllers.bulkDeleteEyeglass
);

export const EyeglassRoutes = router;