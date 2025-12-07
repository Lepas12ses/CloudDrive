export interface AccessTokenPayload {
	userId: string;
}

export function isAccessTokenPayload(obj: unknown): obj is AccessTokenPayload {
	if (typeof obj !== "object") return false;

	if (!("userId" in obj) || typeof obj.userId !== "string") return false;

	return true;
}
