import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import UserDto from "../dto/UserDto.js";

class TokenService {
	generateTokens(payload: object) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
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
			const userDto = jwt.verify(
				accessToken,
				process.env.JWT_ACCESS_SECRET
			) as UserDto;
			return userDto;
		} catch (err) {
			return null;
		}
	}

	validateRefreshToken(refreshToken: string) {
		try {
			const userDto = jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET
			) as UserDto;
			return userDto;
		} catch (err) {
			return null;
		}
	}
}

export default new TokenService();
