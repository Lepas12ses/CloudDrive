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
			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
				httpOnly: true,
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
				next(ApiError.BadRequest("Ошибка валидации", validation.array()));
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
	logout: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
	refresh: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
}

const userController = new UserController();

export default userController;
