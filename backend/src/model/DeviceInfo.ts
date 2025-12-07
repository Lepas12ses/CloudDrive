export interface DeviceInfo {
	ip: string;
	name: string;
}

export function isDeviceInfo(obj: unknown): obj is DeviceInfo {
	if (typeof obj !== "object") return false;

	if (!("ip" in obj) || typeof obj.ip !== "string") return false;

	if (!("name" in obj) || typeof obj.name !== "string") return false;

	return true;
}
