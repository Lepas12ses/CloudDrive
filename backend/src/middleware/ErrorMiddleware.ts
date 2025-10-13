import { ErrorRequestHandler, RequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	res.status(500).json({ message: "Произошла непредвиденная ошибка" });
};

export default errorMiddleware;
