import type { AxiosError, AxiosRequestConfig } from "axios";
import { useLayoutEffect, useRef } from "react";
import axios from "axios";

import instance from "@/shared/api/credentialsAxiosInstance";
import { authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import checkAuth from "../../api/checkAuth";
import useOngoingRequests from "./useOngoingRequests";

export default function useRefreshInterceptor() {
	const dispatch = useAppDispatch();

	const isRefreshingRef = useRef(false);
	const { clearOngoingRequests, addOngoingRequest } = useOngoingRequests();

	useLayoutEffect(() => {
		const interceptor = instance.interceptors.response.use(
			config => config,
			async (err: AxiosError) => {
				const originalRequest = err.config;

				if (originalRequest && err.response?.status === 401) {
					if (isRefreshingRef.current) {
						return new Promise<AxiosRequestConfig>((resolve, reject) => {
							addOngoingRequest({
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
			instance.interceptors.response.eject(interceptor);
		};
	}, [addOngoingRequest, clearOngoingRequests, dispatch]);
}
