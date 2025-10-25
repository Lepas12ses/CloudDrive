import type { RequestHandler } from "express";
import { validationResult } from "express-validator";

import userService from "../service/UserService.js";
import { REFRESH_TOKEN_COOKIE } from "../constants/constants.js";
import ApiError from "../exceptions/ApiError.js";
import { getExpirationTime } from "./lib/util.js";

class UserController {
	login: RequestHandler = async (req, res, next) => {
		try {
			const { login, password } = req.body;

			const tokens = await userService.login(login, password);
			const expiration = getExpirationTime(30);
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
				console.log(validation.array()[0]);

				return next(
					ApiError.BadRequest("Ошибка валидации", validation.array())
				);
			}

			const { login, email, password } = req.body;

			const tokens = await userService.register(login, email, password);
			const expiration = getExpirationTime(30);
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
			const userId = parseInt(req.headers.userId as string);

			const userProfile = await userService.profile(userId);

			res.json(userProfile);
		} catch (err) {
			next(err);
		}
	};
}

const userController = new UserController();

export default userController;
