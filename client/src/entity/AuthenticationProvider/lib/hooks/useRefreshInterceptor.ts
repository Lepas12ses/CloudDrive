import type { AxiosError, AxiosRequestConfig } from "axios";
import { useLayoutEffect } from "react";
import axios from "axios";

import instance from "@/shared/api/credentialsAxiosInstance";
import { authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import checkAuth from "../../api/checkAuth";

export default function useRefreshInterceptor() {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const interceptor = instance.interceptors.response.use(
			config => config,
			async (err: AxiosError) => {
				const originalRequest = err.config;

				if (originalRequest && err.response?.status === 401) {
					try {
						const response = await checkAuth();
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
			instance.interceptors.response.eject(interceptor);
		};
	}, [dispatch]);
}
