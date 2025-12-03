import instance from "@/shared/api/credentialsAxiosInstance";
import wrapResponse from "@/shared/lib/helper/wrapResponse";

export default async function logout() {
	await wrapResponse(async () => {
		await instance.post("auth/logout");
	});
}
