import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { LOCAL_STORAGE_ACCESS_TOKEN } from "../constants";
import type AuthResponse from "../models/AuthResponse";

const BASE_URL = "http://localhost:8000";

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

api.interceptors.request.use(req => {
	req.headers.Authorization = `Bearer ${localStorage.getItem(
		LOCAL_STORAGE_ACCESS_TOKEN
	)}`;

	return req;
});

api.interceptors.response.use(
	config => {
		return config;
	},
	async (err: AxiosError) => {
		const originalRequest = err.config;

		if (err.response?.status === 401) {
			const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
				withCredentials: true,
			});
			localStorage.setItem(
				LOCAL_STORAGE_ACCESS_TOKEN,
				response.data.accessToken
			);
			return api.request(originalRequest as AxiosRequestConfig);
		}

		throw err;
	}
);

export default api;
