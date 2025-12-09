import { Request } from "express";

import { HeadersData } from "#src/model/HeadersData.js";
import { USER_ID } from "../consts/headers.js";

export function getHeadersData(req: Request): HeadersData {
	const userIdRaw = req.headers[USER_ID];
	const userId =
		typeof userIdRaw === "string" ? parseInt(userIdRaw) : undefined;

	return {
		userId,
	};
}

export function setHeadersData(req: Request, data: HeadersData) {
	if (data.userId !== undefined) req.headers[USER_ID] = String(data.userId);
}
