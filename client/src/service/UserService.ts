import api from "@/http";
import type User from "@/models/User";
import wrapResponse from "./util/wrapResponse";
import type UserFile from "@/models/UserFile";
import { type FilesSearchParams } from "@/models/FilesSearchParams";
import type { GenericAbortSignal } from "axios";

class UserService {
	async profile(signal?: GenericAbortSignal) {
		return await wrapResponse(async () => {
			const response = await api.get<User>("user/me", { signal });
			return response.data;
		});
	}
	async files(
		params: FilesSearchParams = { page: "1", limit: "10", search: "" },
		signal?: GenericAbortSignal
	) {
		return await wrapResponse(async () => {
			const response = await api.get<UserFile[]>("files", {
				params,
				signal,
			});
			return response.data;
		});
	}
	async upload(fd: FormData) {
		return await wrapResponse(async () => {
			await api.postForm("files/upload", fd);
		});
	}
	async downloadFile(fileId: number) {
		return await wrapResponse(async () => {
			const response = await api.get<Blob>("files/download", {
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
			await api.delete<void>("files/delete", {
				params: {
					fileId,
				},
			});
		});
	}
}

const userService = new UserService();

export default userService;
