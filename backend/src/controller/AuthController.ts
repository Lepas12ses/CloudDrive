import { RequestHandler } from "express";

import userService from "../service/UserService.js";
import { REFRESH_TOKEN_COOKIE } from "../shared/lib/constants/index.js";
import ApiError from "../exceptions/ApiError.js";
import { getExpirationTime } from "./lib/util.js";

class AuthController {
	logout: RequestHandler = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;

			if (refreshToken) {
				await userService.logout(refreshToken);
				res.clearCookie(REFRESH_TOKEN_COOKIE, {
					httpOnly: true,
					path: "/auth",
				});
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
}

const authController = new AuthController();

export default authController;
