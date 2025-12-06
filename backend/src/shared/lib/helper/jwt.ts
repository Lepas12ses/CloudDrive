import * as jose from "jose";
import env from "../env.js";

const signSecret = new TextEncoder().encode(env.jwtAccessSecret);
const encryptionSecret = jose.base64url.decode(
	jose.base64url.encode(env.jwtRefreshSecret)
);

export async function signJwt(
	payload: object,
	expires: number | string | Date
) {
	return await new jose.SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expires)
		.sign(signSecret);
}

export async function verifyJwt(jwt: string) {
	try {
		return await jose.jwtVerify(jwt, signSecret);
	} catch {
		return null;
	}
}

export async function encryptJwt(
	payload: object,
	expires: number | string | Date
) {
	return await new jose.EncryptJWT({ ...payload })
		.setProtectedHeader({
			alg: "dir",
			enc: "A128CBC-HS256",
		})
		.setIssuedAt()
		.setExpirationTime(expires)
		.encrypt(encryptionSecret);
}

export async function decryptJwt(jwt: string) {
	try {
		return await jose.jwtDecrypt(jwt, encryptionSecret);
	} catch {
		return null;
	}
}
