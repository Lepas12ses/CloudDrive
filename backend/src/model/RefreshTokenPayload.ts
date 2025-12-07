import {
	AccessTokenPayload,
	isAccessTokenPayload,
} from "./AccessTokenPayload.js";

export interface RefreshTokenPayload extends AccessTokenPayload {
	ip: string;
	browser: string;
	creationTime: Date;
}

export function isRefreshTokenPayload(
	obj: unknown
): obj is RefreshTokenPayload {
	if (!isAccessTokenPayload(obj)) return false;

	if (!("ip" in obj) || typeof obj.ip !== "string") return false;

	if (!("browser" in obj) || typeof obj.browser !== "string") return false;

	if (!("creationTime" in obj) || !(obj.creationTime instanceof Date))
		return false;

	return true;
}
