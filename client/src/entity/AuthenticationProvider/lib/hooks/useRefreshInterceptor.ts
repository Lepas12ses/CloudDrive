import type { AxiosError, AxiosRequestConfig } from "axios";
import { useLayoutEffect } from "react";
import axios from "axios";

import instance from "@/shared/api/credentialsAxiosInstance";
import { authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import checkAuth from "../../api/checkAuth";

let isRefreshing = false;

type OngoingRequest = {
	resolve: (token: string) => void;
	reject: () => void;
};

let ongoingRequestsQueue: OngoingRequest[] = [];

const clearQueue = (token: string | null = null) => {
	console.log(ongoingRequestsQueue);

	if (token) {
		ongoingRequestsQueue.forEach(promise => promise.resolve(token));
	} else {
		ongoingRequestsQueue.forEach(promise => promise.reject());
	}

	ongoingRequestsQueue = [];
};

export default function useRefreshInterceptor() {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const interceptor = instance.interceptors.response.use(
			config => config,
			async (err: AxiosError) => {
				const originalRequest = err.config;

				if (originalRequest && err.response?.status === 401) {
					if (isRefreshing) {
						return new Promise<AxiosRequestConfig>((resolve, reject) => {
							ongoingRequestsQueue.push({
								resolve(token) {
									originalRequest.headers.Authorization = `Bearer ${token}`;
									resolve(axios.request(originalRequest));
								},
								reject() {
									reject(err);
								},
							});
						});
					} else {
						isRefreshing = true;

						try {
							const response = await checkAuth();
							dispatch(authActions.setToken(response.data.accessToken));
							originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

							clearQueue(response.data.accessToken);

							return axios.request(originalRequest as AxiosRequestConfig);
						} catch {
							clearQueue();

							dispatch(authActions.setToken(null));
						} finally {
							isRefreshing = false;
						}
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
