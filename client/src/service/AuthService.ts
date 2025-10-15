import axios from "axios";

import api, { BASE_URL } from "../http";
import type SignInData from "../models/SignInData";
import type SignUpData from "../models/SignUpData";
import type AuthResponse from "../models/AuthResponse";

class AuthService {
	async register(data: SignUpData) {
		const response = await api.post<AuthResponse>("user/register", data);
		return response.data;
	}
	async login(data: SignInData) {
		const response = await api.post<AuthResponse>("user/login", data);
		return response.data;
	}
	async logout() {
		await api.post("user/logout");
	}
	async checkAuth() {
		const result = await axios.get<AuthResponse>(`${BASE_URL}/user/refresh`, {
			withCredentials: true,
		});
		return result.data;
	}
}

const authService = new AuthService();

export default authService;
