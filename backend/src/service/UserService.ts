import bcrypt from "bcrypt";

import ApiError from "../exceptions/ApiError.js";
import User from "../model/schema/User.js";
import tokenService from "./TokenService.js";
import Token from "../model/schema/Token.js";
import UserProfileDto from "../model/dto/UserProfileDto.js";
import { DeviceInfo } from "#src/model/DeviceInfo.js";

class UserService {
	async login(login: string, password: string, deviceInfo: DeviceInfo) {
		const user = await User.findOne({ where: { login } });

		if (!user) {
			throw ApiError.BadRequest("Неверный логин или пароль");
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			throw ApiError.BadRequest("Неверный логин или пароль");
		}

		const tokens = await tokenService.refreshTokens(
			{ userId: user.id },
			{ userId: user.id, deviceInfo, creationTime: new Date().toISOString() }
		);

		return tokens;
	}
	async register(
		login: string,
		email: string,
		password: string,
		deviceInfo: DeviceInfo
	) {
		const userWithSameLogin = await User.findOne({
			where: {
				login,
			},
		});

		if (userWithSameLogin) {
			throw ApiError.BadRequest(
				`Пользователь с логином ${login} уже существует`
			);
		}

		const hashedPassword = await bcrypt.hash(password, 3);
		const user = await User.create({ login, email, password: hashedPassword });

		const tokens = await tokenService.refreshTokens(
			{ userId: user.id },
			{ userId: user.id, deviceInfo, creationTime: new Date().toISOString() }
		);

		return tokens;
	}
	async logout(refreshToken: string) {
		await tokenService.destroyToken(refreshToken);
	}
	async refresh(refreshToken: string, deviceInfo: DeviceInfo) {
		const refreshPayload = await tokenService.validateRefreshToken(
			refreshToken
		);

		if (!refreshPayload) throw ApiError.Unauthorized();

		const storedToken = await Token.findOne({ where: { refreshToken } });
		const user = await User.findOne({ where: { id: refreshPayload.userId } });
		if (!storedToken || !user) {
			throw ApiError.Unauthorized();
		}

		const tokens = await tokenService.refreshTokens(
			{ userId: user.id },
			{ userId: user.id, deviceInfo, creationTime: new Date().toISOString() },
			refreshToken
		);

		return tokens;
	}
	async profile(userId: number) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw ApiError.Unauthorized();
		}

		return new UserProfileDto(user);
	}
}

export default new UserService();
