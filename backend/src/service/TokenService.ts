import Token from "../model/schema/Token.js";
import { AccessTokenPayload } from "#src/model/AccessTokenPayload.js";
import { RefreshTokenPayload } from "#src/model/RefreshTokenPayload.js";
import {
	createAccessToken,
	createRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} from "#src/shared/lib/helper/token.js";

class TokenService {
	async refreshTokens(
		accessPayload: AccessTokenPayload,
		refreshPayload: RefreshTokenPayload
	) {
		const tokens = await this.generateTokens(accessPayload, refreshPayload);

		await this.saveToken(accessPayload.userId, tokens.refreshToken);

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

	protected async saveToken(userId: number, refreshToken: string) {
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

	async validateAccessToken(accessToken: string) {
		return await verifyAccessToken(accessToken);
	}

	async validateRefreshToken(refreshToken: string) {
		return await verifyRefreshToken(refreshToken);
	}
}

export default new TokenService();
