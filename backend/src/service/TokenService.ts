import Token from "../model/schema/Token.js";
import { AccessTokenPayload } from "#src/model/AccessTokenPayload.js";
import { RefreshTokenPayload } from "#src/model/RefreshTokenPayload.js";
import {
	createAccessToken,
	createRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} from "#src/shared/lib/helper/token.js";
import { Session } from "#src/model/Session.js";

class TokenService {
	async refreshTokens(
		accessPayload: AccessTokenPayload,
		refreshPayload: RefreshTokenPayload,
		oldRefreshToken?: string
	) {
		const tokens = await this.generateTokens(accessPayload, refreshPayload);

		await this.saveToken(
			accessPayload.userId,
			tokens.refreshToken,
			oldRefreshToken
		);

		return tokens;
	}

	async generateTokens(
		accessPayload: AccessTokenPayload,
		refreshPayload: RefreshTokenPayload
	) {
		const accessToken = await createAccessToken(accessPayload);
		const refreshToken = await createRefreshToken(refreshPayload);
		return {
			refreshToken,
			accessToken,
		};
	}

	protected async saveToken(
		userId: number,
		refreshToken: string,
		oldRefreshToken?: string
	) {
		const existingTokens = await Token.findAll({
			where: {
				userId,
			},
		});

		for (const token of existingTokens) {
			if (!(await verifyRefreshToken(token.refreshToken))) {
				await token.destroy();
			}
		}

		if (oldRefreshToken) {
			const existingToken = await Token.findOne({
				where: {
					userId,
					refreshToken: oldRefreshToken,
				},
			});

			if (existingToken) {
				existingToken.refreshToken = refreshToken;
				return await existingToken.save();
			}

			return await Token.create({ userId, refreshToken });
		} else {
			return await Token.create({ userId, refreshToken });
		}
	}

	async destroyToken(refreshToken: string) {
		await Token.destroy({
			where: {
				refreshToken,
			},
		});
	}

	async validateAccessToken(accessToken: string) {
		return await verifyAccessToken(accessToken);
	}

	async validateRefreshToken(refreshToken: string) {
		return await verifyRefreshToken(refreshToken);
	}

	async getSessions(userId: number) {
		const tokens = await Token.findAll({
			where: {
				userId,
			},
		});

		const sessions: Session[] = [];

		for (const token of tokens) {
			const tokenData = await verifyRefreshToken(token.refreshToken);

			if (!tokenData) continue;

			sessions.push({
				id: token.id!,
				deviceInfo: tokenData.deviceInfo,
				creationTime: tokenData.creationTime,
			});
		}

		return sessions;
	}
}

export default new TokenService();
