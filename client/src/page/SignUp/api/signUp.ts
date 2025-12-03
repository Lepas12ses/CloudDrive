import instance from "@/shared/api/credentialsAxiosInstance";
import type AuthResponse from "@/shared/api/types/AuthResponse";
import wrapResponse from "@/shared/lib/helper/wrapResponse";
import type SignUpData from "../model/SignUpData";

export default async function signUp(data: SignUpData) {
	return await wrapResponse(async () => {
		const response = await instance.post<AuthResponse>("user/register", data);
		return response.data;
	});
}
