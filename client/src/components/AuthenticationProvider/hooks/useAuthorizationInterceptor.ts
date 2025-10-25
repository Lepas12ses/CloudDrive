import { useLayoutEffect } from "react";

import api from "@/http";
import { useAppSelector } from "@/store";

export default function useAuthorizationInterceptor() {
	const { token } = useAppSelector(state => state.auth);

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
}
