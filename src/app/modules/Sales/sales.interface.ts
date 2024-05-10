import { Types } from "mongoose"

export type TSales = {
    productId: Types.ObjectId;
    quantity: number;
    buyer: string;
    dateOfSale: Date;
    soldBy: string;
}

export type TSalesHistory =  {
    _id: Types.ObjectId;
    productId: {
        _id: Types.ObjectId;
        name: string;
        quantity: number;
        price: number;
        frameMaterial: string;
        frameShapes: string;
        color: string;
        frameType: string;
        frameSize: string;
        lensType: string;
        brand: string;
        gender: string;
        img: string;
        addedBy: Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
    };
    quantity: number;
    buyer: string;
    dateOfSale: Date;
    soldBy: Types.ObjectId;
    __v: number;
}
