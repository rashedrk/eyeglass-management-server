import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/QueryBuilder";
import { TEyeglass } from "./eyeglass.interface";
import { Eyeglass } from "./eyeglass.model";
import { TAuthUser } from "../../types/global";


const addEyeglassIntoDB = async (payload: TEyeglass) => {

    const result = await Eyeglass.create(payload);
    return result;
};

const updateEyeglassIntoDB = async (id: string, payload: Partial<TEyeglass>, user: TAuthUser) => {
    // console.log(user);

    let result;
    if (user.role === 'manager') {
        result = await Eyeglass.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }
    else if (user.role === 'user') {
        result = await Eyeglass.findOneAndUpdate({
            _id: id,
            addedBy: user.userId
        }, payload, {
            new: true,
            runValidators: true,
        });
    }


    if (result === null) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    }

    else {
        return result;
    }
}

const deleteEyeglassIntoDB = async (id: string, user: TAuthUser) => {
    let result;
    if (user.role === 'manager') {
        result = await Eyeglass.findOneAndDelete({ _id: id });
    } else if (user.role === 'user') {
        result = await Eyeglass.findOneAndDelete({ _id: id, addedBy: user.userId });
    }

    if (result === null) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    }

    else {
        return null;
    }
}

const bulkDeleteEyeglassIntoDB = async (ids: string[], user: TAuthUser) => {
    let result;
    if (user.role === 'manager') {

        result = await Eyeglass.deleteMany({ _id: ids });
    }
    else if (user.role === 'user') {
        result = await Eyeglass.deleteMany({ _id: ids, addedBy: user.userId });
    }
    return result;
}

const getAllEyeglassesFromDB = async (query: Record<string, unknown>, user: TAuthUser) => {

    let addedByQuery;

    if (user.role === 'manager') {
        addedByQuery = {};
    }
    else if (user.role === 'user') {
        addedByQuery = {
            addedBy: user.userId
        }
    }

    const eyeglassQuery = new QueryBuilder(
        Eyeglass.find({ quantity: { $gt: 0 }, ...addedByQuery }),
        query
    )
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();


    const result = await eyeglassQuery.modelQuery;
    const meta = await eyeglassQuery.countTotal();

    return {
        meta,
        result,
    };
}

export const EyeglassServices = {
    addEyeglassIntoDB,
    updateEyeglassIntoDB,
    deleteEyeglassIntoDB,
    getAllEyeglassesFromDB,
    bulkDeleteEyeglassIntoDB
}
