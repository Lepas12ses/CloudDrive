import type { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useLayoutEffect, useRef } from "react";
import axios from "axios";

import instance from "@/shared/api/credentialsAxiosInstance";
import { authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import checkAuth from "../../api/checkAuth";

type OngoingRequest = {
	resolve: (token: string) => void;
	reject: () => void;
};

export default function useRefreshInterceptor() {
	const dispatch = useAppDispatch();

	const isRefreshingRef = useRef(false);
	const ongoingRequestsRef = useRef<OngoingRequest[]>([]);

	const clearOngoingRequests = useCallback((token: string | null = null) => {
		if (token) {
			ongoingRequestsRef.current.forEach(promise => promise.resolve(token));
		} else {
			ongoingRequestsRef.current.forEach(promise => promise.reject());
		}

		ongoingRequestsRef.current = [];
	}, []);

	useLayoutEffect(() => {
		const interceptor = instance.interceptors.response.use(
			config => config,
			async (err: AxiosError) => {
				const originalRequest = err.config;

				if (originalRequest && err.response?.status === 401) {
					if (isRefreshingRef.current) {
						return new Promise<AxiosRequestConfig>((resolve, reject) => {
							ongoingRequestsRef.current.push({
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
						isRefreshingRef.current = true;

						try {
							const response = await checkAuth();
							dispatch(authActions.setToken(response.data.accessToken));
							originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

							clearOngoingRequests(response.data.accessToken);

							return axios.request(originalRequest as AxiosRequestConfig);
						} catch {
							clearOngoingRequests();

							dispatch(authActions.setToken(null));
						} finally {
							isRefreshingRef.current = false;
						}
					}
				}

				throw err;
			}
		);

		return () => {
			clearOngoingRequests();
			instance.interceptors.response.eject(interceptor);
		};
	}, [clearOngoingRequests, dispatch]);
}
