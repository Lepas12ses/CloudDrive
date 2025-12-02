import type { GenericAbortSignal } from "axios";

import type User from "@/models/User";
import wrapResponse from "./util/lib/helper/wrapResponse";
import { type FilesSearchParams } from "@/models/FilesSearchParams";
import type FilesResponse from "@/models/FilesResponse";
import instance from "@/shared/api/credentialsAxiosInstance";

class UserService {
	async profile(signal?: GenericAbortSignal) {
		return await wrapResponse(async () => {
			const response = await instance.get<User>("user/me", { signal });
			return response.data;
		});
	}
	async files(
		params: FilesSearchParams = { page: "1", limit: "10" },
		signal?: GenericAbortSignal
	) {
		return await wrapResponse(async () => {
			const response = await instance.get<FilesResponse>("files", {
				params,
				signal,
			});
			return response.data;
		});
	}
	async upload(fd: FormData) {
		return await wrapResponse(async () => {
			await instance.postForm("files/upload", fd);
		});
	}
	async downloadFile(fileId: number) {
		return await wrapResponse(async () => {
			const response = await instance.get<Blob>("files/download", {
				params: {
					fileId,
				},
				responseType: "blob",
			});

			return response.data;
		});
	}
	async deleteFile(fileId: number) {
		return await wrapResponse(async () => {
			await instance.delete<void>("files/delete", {
				params: {
					fileId,
				},
			});
		});
	}
}

const userService = new UserService();

export default userService;
