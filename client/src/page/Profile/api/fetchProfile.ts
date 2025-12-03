import type { GenericAbortSignal } from "axios";

import type User from "@/models/User";
import instance from "@/shared/api/credentialsAxiosInstance";
import wrapResponse from "@/shared/lib/helper/wrapResponse";

export default async function fetchProfile(signal?: GenericAbortSignal) {
	return await wrapResponse(async () => {
		const response = await instance.get<User>("user/me", { signal });
		return response.data;
	});
}
