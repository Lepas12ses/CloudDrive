import type AuthResponse from "@/shared/api/types/AuthResponse";
import axios from "axios";

import { BASE_URL } from "@/shared/api/credentialsAxiosInstance";

export default async function checkAuth() {
	const result = await axios.get<AuthResponse>(`${BASE_URL}/auth/refresh`, {
		withCredentials: true,
	});
	return result;
}
