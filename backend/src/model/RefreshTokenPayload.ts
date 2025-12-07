import {
	AccessTokenPayload,
	isAccessTokenPayload,
} from "./AccessTokenPayload.js";

export interface RefreshTokenPayload extends AccessTokenPayload {
	ip: string;
}

export function isRefreshTokenPayload(
	obj: unknown
): obj is RefreshTokenPayload {
	if (!isAccessTokenPayload(obj)) return false;

	if (!("ip" in obj) || typeof obj.ip !== "string") return false;

	return true;
}
