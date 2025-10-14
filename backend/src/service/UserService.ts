import bcrypt from "bcrypt";

import UserDto from "../dto/UserDto.js";
import ApiError from "../exceptions/ApiError.js";
import User from "../models/User.js";
import tokenService from "./TokenService.js";

class UserService {
	async login(login: string, password: string) {
		const user = await User.findOne({ where: { login } });

		if (!user) {
			throw ApiError.BadRequest(
				`Пользователя с логином ${login} не существует`
			);
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			throw ApiError.BadRequest(`Неверный пароль`);
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		tokenService.saveToken(userDto.id, tokens.refreshToken);

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

		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return tokens;
	}
	async logout(refreshToken: string) {
		//...
	}
	async refresh(refreshToken: string) {
		//...
	}
}

export default new UserService();
