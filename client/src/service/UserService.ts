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
}

const userService = new UserService();

export default userService;
