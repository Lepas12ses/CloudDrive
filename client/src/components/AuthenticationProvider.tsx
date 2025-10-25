import {
	useEffect,
	useLayoutEffect,
	useState,
	type FC,
	type PropsWithChildren,
} from "react";
import axios from "axios";

import api, { BASE_URL } from "@/http";
import { useAppDispatch, useAppSelector } from "@/store";
import { actions as authActions } from "@/store/auth";
import authService from "@/service/AuthService";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type AuthResponse from "@/models/AuthResponse";

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function check() {
			try {
				const result = await authService.checkAuth();
				dispatch(authActions.setToken(result.data.accessToken));
			} catch {
				dispatch(authActions.setToken(null));
			}
			setIsLoading(false);
		}

		check();
	}, [dispatch]);

	useLayoutEffect(() => {
		if (token) {
			const interceptor = api.interceptors.request.use(config => {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			});

			return () => {
				api.interceptors.request.eject(interceptor);
			};
		}
	}, [token]);

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

	return <>{isLoading ? null : children}</>;
};

export default AuthenticationProvider;
