import catchAsync from "../../utils/catchAsync";
import getRole from "../../utils/getUser";
import sendResponse from "../../utils/sendResponse";
import { EyeglassServices } from "./eyeglass.services";


const addEyeglass = catchAsync(async (req, res) => {
    const result = await EyeglassServices.addEyeglassIntoDB(req.body);

    sendResponse(res, {
        message: 'Eyeglass is added successfully',
        data: result,
    })
});

const updateEyeglass = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const user = getRole(token as string);
    const { id } = req.params;
    const result = await EyeglassServices.updateEyeglassIntoDB(id, req.body, user);

    sendResponse(res, {
        message: 'Eyeglass updated  successfully',
        data: result,
    })
})
const deleteEyeglass = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const user = getRole(token as string);
    const { id } = req.params;
    const result = await EyeglassServices.deleteEyeglassIntoDB(id, user);

    sendResponse(res, {
        message: 'Eyeglass has been deleted  successfully',
        data: result,
    })
})
const bulkDeleteEyeglass = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const user = getRole(token as string);

    const result = await EyeglassServices.bulkDeleteEyeglassIntoDB(req.body.ids, user);

    sendResponse(res, {
        message: 'Selected Eyeglasses has been deleted  successfully',
        data: result,
    })
})

const getAllEyeglasses = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const user = getRole(token as string);
    
    const result = await EyeglassServices.getAllEyeglassesFromDB(req.query, user);

    sendResponse(res, {
        message: 'Eyeglass retrieved  successfully',
        meta: result.meta,
        data: result.result,
    })
});

export const EyeglassControllers = {
    addEyeglass,
    updateEyeglass,
    deleteEyeglass,
    getAllEyeglasses,
    bulkDeleteEyeglass
}