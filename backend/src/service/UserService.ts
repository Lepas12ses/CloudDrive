import bcrypt from "bcrypt";

import UserDto from "../dto/UserDto.js";
import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import tokenService from "./TokenService.js";
import Token from "../models/Token.js";
import UserProfileDto from "../dto/UserProfileDto.js";

class UserService {
	async login(login: string, password: string) {
		const user = await User.findOne({ where: { login } });

		if (!user) {
			throw ApiError.BadRequest("Неверный логин или пароль");
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			throw ApiError.BadRequest("Неверный логин или пароль");
		}

		const userDto = new UserDto(user);
		const tokens = await tokenService.refreshTokens(userDto);

		return tokens;
	}
	async register(login: string, email: string, password: string) {
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
		const userDto = new UserDto(user);
		const tokens = await tokenService.refreshTokens(userDto);

		return tokens;
	}
	async logout(refreshToken: string) {
		await tokenService.destroyToken(refreshToken);
	}
	async refresh(refreshToken: string) {
		const tokenUser = tokenService.validateRefreshToken(refreshToken);

		const storedToken = Token.findOne({ where: { refreshToken } });
		const user = await User.findOne({ where: { id: tokenUser.id } });
		if (!storedToken || !user) {
			throw ApiError.Unauthorized();
		}

		const userDto = new UserDto(user);
		const tokens = await tokenService.refreshTokens(userDto);

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
