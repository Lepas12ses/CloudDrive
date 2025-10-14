import api from "../http";
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
}

const authService = new AuthService();

export default authService;
