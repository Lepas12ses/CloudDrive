import express from "express";
import cors from "cors";

import databaseService from "./service/DatabaseService.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoutes.js";
import errorMiddleware from "./middleware/ErrorMiddleware.js";
import authRouter from "./routes/AuthRoutes.js";
import fileRouter from "./routes/FileRoutes.js";

const port = process.env.PORT || 8080;

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/files", fileRouter);
app.use("/auth", authRouter);
app.use(errorMiddleware);

async function start() {
	try {
		databaseService.connect();

		app.listen(port, () => {
			console.log(`Сервер запущен на порту: ${port}`);
		});
	} catch (err) {
		console.log(`Произошла ошибка при запуске ${err}`);
	}
}

start();
