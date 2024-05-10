import catchAsync from "../../utils/catchAsync";
import getRole from "../../utils/getUser";
import sendResponse from "../../utils/sendResponse";
import { SalesServices } from "./sales.services";


const createSales = catchAsync(async (req, res) => {
    const result = await SalesServices.createSalesIntoDB(req.body);
    sendResponse(res, {
        message: 'Sales created successfully',
        data: result,
    })
});
const getSales = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const user = getRole(token as string);
    const type = req.query.type
    const date = req.query.date
    
    const result = await SalesServices.getSalesFromDB(type, date , user);
    sendResponse(res, {
        message: 'Sales retrieved successfully',
        data: result,
    })
});

export const SalesControllers = {
    createSales,
    getSales
}