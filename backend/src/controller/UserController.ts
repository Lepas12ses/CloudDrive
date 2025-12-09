import type { RequestHandler } from "express";
import { validationResult } from "express-validator";

import userService from "#src/service/UserService.js";
import { REFRESH_TOKEN_COOKIE } from "#src/shared/lib/consts/headers.js";
import ApiError from "#src/exceptions/ApiError.js";
import getExpirationTime from "#src/shared/lib/helper/getExpirationTime.js";
import { DeviceInfo } from "#src/model/DeviceInfo.js";
import env from "#src/shared/lib/helper/env.js";
import tokenService from "#src/service/TokenService.js";
import { getHeadersData } from "#src/shared/lib/helper/headersData.js";

class UserController {
	login: RequestHandler = async (req, res, next) => {
		try {
			const { login, password } = req.body;

			const device: DeviceInfo = {
				ip: req.ip || "unknown",
				name: req.headers["user-agent"] || "unknown",
			};

			const tokens = await userService.login(login, password, device);
			const expiration = getExpirationTime(env.jwtRefreshExpiration);
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
				path: "/auth",
				expires: expiration,
			});

			res.json({ accessToken: tokens.accessToken });
		} catch (err) {
			next(err);
		}
	};
	register: RequestHandler = async (req, res, next) => {
		try {
			const validation = validationResult(req);

			if (!validation.isEmpty()) {
				return next(
					ApiError.BadRequest("Ошибка валидации", validation.array())
				);
			}

			const { login, email, password } = req.body;

			const device: DeviceInfo = {
				ip: req.ip || "unknown",
				name: req.headers["user-agent"] || "unknown",
			};

			const tokens = await userService.register(login, email, password, device);
			const expiration = getExpirationTime(env.jwtRefreshExpiration);
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
				path: "/auth",
				expires: expiration,
			});

			res.json({ accessToken: tokens.accessToken });
		} catch (err) {
			next(err);
		}
	};
	me: RequestHandler = async (req, res, next) => {
		try {
			const { userId } = getHeadersData(req);

			if (userId === undefined) next(ApiError.Unauthorized);

			const userProfile = await userService.profile(userId);

			res.json(userProfile);
		} catch (err) {
			next(err);
		}
	};
	sessions: RequestHandler = async (req, res, next) => {
		try {
			const userId = parseInt(req.headers.userId as string);

			if (userId === undefined) next(ApiError.Unauthorized);

			const sessions = await tokenService.getSessions(userId);

			res.json({ sessions });
		} catch (err) {
			next(err);
		}
	};
}

const userController = new UserController();

export default userController;
