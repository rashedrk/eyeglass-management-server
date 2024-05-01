import { Schema, model } from "mongoose";

import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Eyeglass } from "../Eyeglass/eyeglass.model";
import { TSales } from "./sales.interface";

const salesSchema = new Schema<TSales>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Eyeglass"
    },
    quantity: {
        type: Number,
        required: true,
    },
    buyer: {
        type: String,
        required: true,
    },
    dateOfSale: {
        type: Date,
        required: true,
    },
});

salesSchema.pre('save', async function(next){
const product = await Eyeglass.findById(this.productId);
const availableQuantity = product?.quantity as number;
if (this.quantity > availableQuantity) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid quantity")
}
next()
})


export const Sales = model<TSales>('Sales', salesSchema);