import {
	AccessTokenPayload,
	isAccessTokenPayload,
} from "#src/model/AccessTokenPayload.js";
import {
	RefreshTokenPayload,
	isRefreshTokenPayload,
} from "#src/model/RefreshTokenPayload.js";
import env from "./env.js";
import { encryptJwt, signJwt, verifyJwt, decryptJwt } from "./jwt.js";

export async function createAccessToken(payload: AccessTokenPayload) {
	return await signJwt(payload, env.jwtAccessExpiration);
}

export async function verifyAccessToken(
	token: string
): Promise<AccessTokenPayload | null> {
	const data = await verifyJwt(token);

	if (!data) return null;

	if (isAccessTokenPayload(data.payload)) return data.payload;

	return null;
}

export async function createRefreshToken(payload: RefreshTokenPayload) {
	return await encryptJwt(payload, env.jwtRefreshExpiration);
}

export async function verifyRefreshToken(
	token: string
): Promise<RefreshTokenPayload | null> {
	const data = await decryptJwt(token);

	if (!data) return null;

	if (isRefreshTokenPayload(data.payload)) return data.payload;

	return null;
}
