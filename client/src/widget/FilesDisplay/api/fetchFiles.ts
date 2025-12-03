import type { GenericAbortSignal } from "axios";

import wrapResponse from "@/shared/lib/helper/wrapResponse";
import instance from "@/shared/api/credentialsAxiosInstance";
import type FilesResponse from "../model/FilesResponse";
import type { FilesSearchParams } from "@/shared/model/FilesSearchParams";

export default async function fetchFiles(
	params: FilesSearchParams = { page: "1", limit: "10" },
	signal?: GenericAbortSignal
) {
	return wrapResponse(async () => {
		const response = await instance.get<FilesResponse>("files", {
			params,
			signal,
		});
		return response.data;
	});
}
