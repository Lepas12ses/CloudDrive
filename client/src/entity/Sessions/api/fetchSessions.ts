import type { GenericAbortSignal } from "axios";

import instance from "@/shared/api/credentialsAxiosInstance";
import wrapResponse from "@/shared/lib/helper/wrapResponse";
import type Sessions from "../model/Sessions";

export default async function fetchSessions(signal?: GenericAbortSignal) {
	return await wrapResponse(async () => {
		const response = await instance.get<Sessions>("user/sessions", { signal });
		return response.data;
	});
}
