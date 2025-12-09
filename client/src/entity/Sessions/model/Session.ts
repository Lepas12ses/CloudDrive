import type DeviceInfo from "./DeviceInfo";

export default interface Session {
	id: number;
	deviceInfo: DeviceInfo;
	creationTime: string;
}
