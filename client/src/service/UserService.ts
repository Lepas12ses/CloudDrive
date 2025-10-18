import api from "@/http";
import type User from "@/models/User";
import wrapResponse from "./util/wrapResponse";
import type UserFile from "@/models/UserFile";

class UserService {
	async profile() {
		return await wrapResponse(async () => {
			const response = await api.get<User>("user/me");
			return response.data;
		});
	}
	async files() {
		return await wrapResponse(async () => {
			const response = await api.get<UserFile[]>("files");
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
