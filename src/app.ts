import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://eye-glass-management-v2-client.vercel.app'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Eye glass server v2.0');
});

//application routes
app.use('/api/v1', router);

app.use(globalErrorHandler)

export default app;