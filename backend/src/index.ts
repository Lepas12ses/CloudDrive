import express from "express";
import { config } from "dotenv";
import cors from "cors";

import databaseService from "./service/DatabaseService.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoutes.js";
import errorMiddleware from "./middleware/ErrorMiddleware.js";

config();

const port = process.env.PORT || 8000;

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
