import { useEffect, useState } from "react";

import authService from "@/service/AuthService";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";

export default function useCheckAuth() {
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

	return {
		isLoading,
	};
}
