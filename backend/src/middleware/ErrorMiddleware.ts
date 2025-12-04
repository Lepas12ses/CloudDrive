import { ErrorRequestHandler } from "express";
import ApiError from "../exceptions/ApiError.js";

const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
	console.log(err);
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	res.status(500).json({ message: "Произошла непредвиденная ошибка" });
};

export default errorMiddleware;
