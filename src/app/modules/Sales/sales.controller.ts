import catchAsync from "../../utils/catchAsync";
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
    const type = req.params.type
    const date = req.query.date
    
    const result = await SalesServices.getSalesFromDB(type, date as string);
    sendResponse(res, {
        message: 'Sales retrieved successfully',
        data: result,
    })
});

export const SalesControllers = {
    createSales,
    getSales
}