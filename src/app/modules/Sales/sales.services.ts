import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import moment from "moment";
import { TSales } from "./sales.interface";
import { Sales } from "./sales.model";
import { Eyeglass } from "../Eyeglass/eyeglass.model";
import { TAuthUser } from "../../types/global";

const createSalesIntoDB = async (payload: TSales) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // create sales
        const sales = await Sales.create(payload);

        if (!sales) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Sales');
        }

        //update sales quantity into eyeglass collection
        const updateEyeglassQuantity = await Eyeglass.findByIdAndUpdate(payload.productId, {
            $inc: { quantity: -payload.quantity }
        });

        if (!updateEyeglassQuantity) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Sales');
        }

        await session.commitTransaction();
        await session.endSession();

        return sales;
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Sales')
    }
};

const getSalesFromDB = async (type: string, date: string, user: TAuthUser) => {
    // console.log(type, date);
    let addedByQuery;

    if (user.role === 'manager') {
        addedByQuery = {};
    }
    else if (user.role === 'user') {
        addedByQuery = {
            soldBy: {
                $eq: user.userId
            }
        }
    }
    // const allSales = await Sales.find();
    let startDate, endDate;
    let year, weekNumber, monthNumber;
    switch (type) {
        case 'daily':
            endDate = new Date(date);
            break;
        case 'weekly':
            [year, weekNumber] = date.split('-').map(Number);
            startDate = moment().year(year).week(weekNumber).startOf('week').toDate();
            endDate = moment().year(year).week(weekNumber).endOf('week').toDate();
            break;
        case 'monthly':
            [year, monthNumber] = date.split('-').map(Number);
            startDate = moment().year(year).month(monthNumber - 1).startOf('month').toDate();
            endDate = moment().year(year).month(monthNumber - 1).endOf('month').toDate();
            break;
        case 'yearly':
            startDate = moment().year(Number(date)).startOf('year').toDate();
            endDate = moment().year(Number(date)).endOf('year').toDate();
            // console.log(startDate, endDate);

            break;
        default:
            // Handle invalid range
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid format');
    }


    try {
        let salesData = [];

        if (type === 'daily') {
            salesData = await Sales.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                dateOfSale: {
                                    $eq: endDate
                                },
                            },
                            { ...addedByQuery }
                        ]
                    }
                },
                {
                    $lookup: { from: 'eyeglasses', localField: 'productId', foreignField: '_id', as: 'product' }
                },
                {
                    $sort: { 'dateOfSale': -1 }
                }
            ]);
        }
        else if (type === 'weekly' || type === 'monthly' || type === 'yearly') {
            // console.log(startDate, endDate);
            salesData = await Sales.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                dateOfSale: {
                                    $gt: startDate,
                                    $lte: endDate
                                }

                            },
                            { ...addedByQuery }
                        ]
                    }
                },
                {
                    $lookup: { from: 'eyeglasses', localField: 'productId', foreignField: '_id', as: 'product' }
                },
                {
                    $sort: { 'dateOfSale': -1 }
                }
            ]);
        }
        // console.log(salesData);


        let result;
        if (salesData?.length > 0) {
            result = salesData.map(sale => {
                return {
                    _id: sale._id,
                    productName: sale.product[0].name,
                    buyerName: sale.buyer,
                    quantity: sale.quantity,
                    unitPrice: sale.product[0].price,
                    totalPrice: (sale.quantity * sale.product[0].price).toFixed(2),
                    date: sale.dateOfSale,
                    img: sale.product[0].img
                };
            });
        }

        else {
            result = null;
        }

        return result
    } catch (err) {
        console.error(err);
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get Sales');
    }
};

export const SalesServices = {
    createSalesIntoDB,
    getSalesFromDB,
}