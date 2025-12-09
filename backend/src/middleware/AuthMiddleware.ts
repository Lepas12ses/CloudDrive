import { RequestHandler } from "express";

import ApiError from "#src/exceptions/ApiError.js";
import tokenService from "#src/service/TokenService.js";
import { setHeadersData } from "#src/shared/lib/helper/headersData.js";

const authMiddleware: RequestHandler = async (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth) {
		return next(ApiError.Unauthorized());
	}

	const token = auth.split(" ")[1];
	if (!token) {
		return next(ApiError.Unauthorized());
	}

	const accessPayload = await tokenService.validateAccessToken(token);
	if (!accessPayload) {
		return next(ApiError.Unauthorized());
	}

	setHeadersData(req, {
		userId: accessPayload.userId,
	});

	next();
};

export default authMiddleware;
