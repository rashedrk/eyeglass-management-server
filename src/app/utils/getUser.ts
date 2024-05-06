import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config/config";

const getRole = (token: string) => {
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;
    // console.log(decoded);
    

    const user = {
        role,
        userId,
    }

    return user;
};

export default getRole;