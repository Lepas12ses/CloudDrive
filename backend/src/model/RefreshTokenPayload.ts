import {
	AccessTokenPayload,
	isAccessTokenPayload,
} from "./AccessTokenPayload.js";
import { DeviceInfo, isDeviceInfo } from "./DeviceInfo.js";

export interface RefreshTokenPayload extends AccessTokenPayload {
	ip: string;
	deviceInfo: DeviceInfo;
	creationTime: Date;
}

export function isRefreshTokenPayload(
	obj: unknown
): obj is RefreshTokenPayload {
	if (!isAccessTokenPayload(obj)) return false;

	if (!("deviceInfo" in obj) || !isDeviceInfo(obj.deviceInfo)) return false;

	if (!("creationTime" in obj) || !(obj.creationTime instanceof Date))
		return false;

	return true;
}
