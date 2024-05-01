import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/QueryBuilder";
import { TEyeglass } from "./eyeglass.interface";
import { Eyeglass } from "./eyeglass.model";


const addEyeglassIntoDB = async (payload: TEyeglass) => {
    const result = await Eyeglass.create(payload);
    return result;
};

const updateEyeglassIntoDB = async (id: string, payload: Partial<TEyeglass>) => {
    const result = await Eyeglass.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    // console.log(result);

    if (result === null) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    }

    else {
        return result;
    }
}

const deleteEyeglassIntoDB = async (id: string) => {
    const result = await Eyeglass.findOneAndDelete({ _id: id });
    if (result === null) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    }

    else {
        return null;
    }
}

const bulkDeleteEyeglassIntoDB = async (ids: string[]) => {
    const result = await Eyeglass.deleteMany({ _id: ids });
    return result;
}

const getAllEyeglassesFromDB = async (query: Record<string, unknown>) => {
    const eyeglassQuery = new QueryBuilder(
        Eyeglass.find({ quantity: { $gt: 0 } }),
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
