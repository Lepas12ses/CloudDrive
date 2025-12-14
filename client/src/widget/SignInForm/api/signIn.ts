import wrapResponse from "@/shared/lib/helper/wrapResponse";
import type SignInData from "../model/SignInData";
import instance from "@/shared/api/credentialsAxiosInstance";
import type AuthResponse from "@/shared/model/AuthResponse";

export default async function signIn(data: SignInData) {
	return await wrapResponse(async () => {
		const response = await instance.post<AuthResponse>("user/login", data);
		return response.data;
	});
}
