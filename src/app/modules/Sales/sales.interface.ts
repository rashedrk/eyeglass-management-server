import { Types } from "mongoose"

export type TSales = {
    productId: Types.ObjectId;
    quantity: number;
    buyer: string;
    dateOfSale: Date;
    soldBy: string;
}