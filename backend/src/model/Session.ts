import { DeviceInfo } from "./DeviceInfo.js";

export interface Session {
	id: number;
	deviceInfo: DeviceInfo;
	creationTime: string;
}
