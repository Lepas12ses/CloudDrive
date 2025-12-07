import {
	AccessTokenPayload,
	isAccessTokenPayload,
} from "./AccessTokenPayload.js";
import { DeviceInfo, isDeviceInfo } from "./DeviceInfo.js";

export interface RefreshTokenPayload extends AccessTokenPayload {
	deviceInfo: DeviceInfo;
	creationTime: string;
}

export function isRefreshTokenPayload(
	obj: unknown
): obj is RefreshTokenPayload {
	if (!isAccessTokenPayload(obj)) return false;

	if (!("deviceInfo" in obj) || !isDeviceInfo(obj.deviceInfo)) return false;

	if (!("creationTime" in obj) || typeof obj.creationTime !== "string")
		return false;

	return true;
}
