import { RequestHandler } from "express";

import userService from "#src/service/UserService.js";
import { REFRESH_TOKEN_COOKIE } from "#src/shared/lib/consts/headers.js";
import ApiError from "#src/exceptions/ApiError.js";
import getExpirationTime from "#src/shared/lib/helper/getExpirationTime.js";
import { DeviceInfo } from "#src/model/DeviceInfo.js";
import env from "#src/shared/lib/helper/env.js";

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

			const device: DeviceInfo = {
				ip: req.ip || "unknown",
				name: req.headers["user-agent"] || "unknown",
			};

			const tokens = await userService.refresh(refreshToken, device);
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
}

const authController = new AuthController();

export default authController;
