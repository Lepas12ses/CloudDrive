export interface AccessTokenPayload {
	userId: number;
}

export function isAccessTokenPayload(obj: unknown): obj is AccessTokenPayload {
	if (typeof obj !== "object") return false;

	if (!("userId" in obj) || typeof obj.userId !== "number") return false;

	return true;
}
