import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken } = result;


    sendResponse(res, {
        message: 'User login successful!',
        data: {
            accessToken,
        },
    });
});

export const AuthControllers = {
    loginUser,
}