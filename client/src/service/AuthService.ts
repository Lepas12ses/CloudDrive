import axios from "axios";

import api, { BASE_URL } from "../http";
import type SignInData from "../models/SignInData";
import type SignUpData from "../models/SignUpData";
import type AuthResponse from "../models/AuthResponse";
import type ApiErrorResponse from "@/models/ApiErrorResponse";

class AuthService {
	async register(data: SignUpData) {
		try {
			const response = await api.post<AuthResponse>("user/register", data);
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
	async login(data: SignInData) {
		try {
			const response = await api.post<AuthResponse>("user/login", data);
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
