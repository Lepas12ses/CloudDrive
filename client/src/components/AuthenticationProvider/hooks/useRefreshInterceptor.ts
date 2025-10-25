import type { AxiosError, AxiosRequestConfig } from "axios";
import { useLayoutEffect } from "react";
import axios from "axios";

import api from "@/http";
import authService from "@/service/AuthService";
import { actions as authActions } from "@/store/auth";
import { useAppDispatch } from "@/store";

export default function useRefreshInterceptor() {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const interceptor = api.interceptors.response.use(
			config => config,
			async (err: AxiosError) => {
				const originalRequest = err.config;

				if (originalRequest && err.response?.status === 401) {
					try {
						const response = await authService.checkAuth();
						dispatch(authActions.setToken(response.data.accessToken));
						originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
						return axios.request(originalRequest as AxiosRequestConfig);
					} catch {
						dispatch(authActions.setToken(null));
					}
				}

				throw err;
			}
		);

		return () => {
			api.interceptors.response.eject(interceptor);
		};
	}, [dispatch]);
}
