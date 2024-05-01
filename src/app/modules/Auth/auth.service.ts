import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";
import config from "../../config/config";

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    //checking if the password is correct
    if (!(await bcrypt.compare(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }

    // creating a jwtpayload with user info to send client 
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {
        accessToken,
        refreshToken
    }
};

export const AuthServices = {
    loginUser
}