import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { EyeglassRoutes } from "../modules/Eyeglass/eyeglass.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/eyeglass',
        route: EyeglassRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;