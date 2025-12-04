import { RequestHandler } from "express";
import ApiError from "#src/exceptions/ApiError.js";
import TokenService from "#src/service/TokenService.js";

const authMiddleware: RequestHandler = (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth) {
		return next(ApiError.Unauthorized());
	}

	const token = auth.split(" ")[1];
	if (!token) {
		return next(ApiError.Unauthorized());
	}

	const userDto = TokenService.validateAccessToken(token);
	if (!userDto) {
		return next(ApiError.Unauthorized());
	}
	req.headers.userId = `${userDto.id}`;

	next();
};

export default authMiddleware;
