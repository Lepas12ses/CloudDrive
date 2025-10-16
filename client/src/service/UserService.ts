import axios from "axios";

import api from "@/http";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import type User from "@/models/User";

class UserService {
	async profile() {
		try {
			const response = await api.get<User>("user/me");
			return response.data;
		} catch (err) {
			if (axios.isAxiosError<ApiErrorResponse>(err)) {
				const errResponse = err.response?.data;

				if (errResponse) {
					throw errResponse;
				}
			}

			throw { message: "Что-то пошло не так" };
		}
	}
}

const userService = new UserService();

export default userService;
