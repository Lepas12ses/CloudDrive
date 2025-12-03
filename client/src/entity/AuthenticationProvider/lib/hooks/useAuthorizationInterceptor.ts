import { useLayoutEffect } from "react";

import instance from "@/shared/api/credentialsAxiosInstance";
import { useAppSelector } from "@/shared/lib/store/hooks/useAppSelector";
import authStateSelector from "@/shared/lib/store/selectors/authStateSelector";

export default function useAuthorizationInterceptor() {
	const { token } = useAppSelector(authStateSelector);

	useLayoutEffect(() => {
		if (token) {
			const interceptor = instance.interceptors.request.use(config => {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			});

			return () => {
				instance.interceptors.request.eject(interceptor);
			};
		}
	}, [token]);
}
