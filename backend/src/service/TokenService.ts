import jwt from "jsonwebtoken";

import Token from "../model/schema/Token.js";
import UserDto from "../model/dto/UserDto.js";
import env from "../shared/lib/env.js";

class TokenService {
	async refreshTokens(userDto: UserDto) {
		const tokens = this.generateTokens({ ...userDto });
		await this.saveToken(userDto.id, tokens.refreshToken);

		return tokens;
	}

	generateTokens(payload: object) {
		const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
			expiresIn: "30d",
		});
		return {
			refreshToken,
			accessToken,
		};
	}

	async saveToken(userId: number, refreshToken: string) {
		const existingToken = await Token.findOne({
			where: {
				userId,
			},
		});

		if (existingToken) {
			existingToken.refreshToken = refreshToken;
			return await existingToken.save();
		}

		return await Token.create({ userId, refreshToken });
	}

	async destroyToken(refreshToken: string) {
		await Token.destroy({
			where: {
				refreshToken,
			},
		});
	}

	validateAccessToken(accessToken: string) {
		try {
			const userDto = jwt.verify(accessToken, env.jwtAccessSecret) as UserDto;
			return userDto;
		} catch {
			return null;
		}
	}

	validateRefreshToken(refreshToken: string) {
		try {
			const userDto = jwt.verify(refreshToken, env.jwtRefreshSecret) as UserDto;
			return userDto;
		} catch {
			return null;
		}
	}
}

export default new TokenService();
