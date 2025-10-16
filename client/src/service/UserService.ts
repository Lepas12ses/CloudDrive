import api from "@/http";
import type User from "@/models/User";
import wrapResponse from "./util/wrapResponse";

class UserService {
	async profile() {
		return await wrapResponse(async () => {
			const response = await api.get<User>("user/me");
			return response.data;
		});
	}
	async files() {
		return await wrapResponse(async () => {
			const response = await api.get<File[]>("files");
			return response.data;
		});
	}
}

const userService = new UserService();

export default userService;
