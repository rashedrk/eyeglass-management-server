import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { EyeglassRoutes } from "../modules/Eyeglass/eyeglass.route";
import { SalesRoutes } from "../modules/Sales/sales.route";

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
    {
        path: '/sales',
        route: SalesRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;