import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import fileRouter from "./routes/FileRoutes.js";
import databaseService from "./service/DatabaseService.js";
import errorMiddleware from "./middleware/ErrorMiddleware.js";
import env from "./shared/lib/env.js";

export const app = express();

app.use(
	cors({
		origin: env.clientUrl,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/files", fileRouter);
app.use("/auth", authRouter);
app.use(errorMiddleware);

export default async function startApp() {
	const port = env.port;
	try {
		databaseService.connect();

		app.listen(port, () => {
			console.log(`Сервер запущен на порту: ${port}`);
		});
	} catch (err) {
		console.log(`Произошла ошибка при запуске ${err}`);
	}
}
