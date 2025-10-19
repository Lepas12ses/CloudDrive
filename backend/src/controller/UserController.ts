import type { RequestHandler } from "express";
import { validationResult } from "express-validator";

import userService from "../service/UserService.js";
import { REFRESH_TOKEN_COOKIE } from "../constants/constants.js";
import ApiError from "../exceptions/ApiError.js";

class UserController {
	login: RequestHandler = async (req, res, next) => {
		try {
			const { login, password } = req.body;

			const tokens = await userService.login(login, password);
			const now = new Date();
			const expiration = new Date(now);
			expiration.setDate(now.getDate() + 30);
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
				path: "/user/refresh",
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
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
			});

			res.json({ accessToken: tokens.accessToken });
		} catch (err) {
			next(err);
		}
	};
	logout: RequestHandler = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			if (refreshToken) {
				await userService.logout(refreshToken);
				res.clearCookie(REFRESH_TOKEN_COOKIE);
			}

			res.status(200).end();
		} catch (err) {
			next(err);
		}
	};
	refresh: RequestHandler = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;

			if (!refreshToken) {
				return next(ApiError.Unauthorized());
			}

			const tokens = await userService.refresh(refreshToken);
			const now = new Date();
			const expiration = new Date(now);
			expiration.setDate(now.getDate() + 30);
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
				path: "/user/refresh",
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
