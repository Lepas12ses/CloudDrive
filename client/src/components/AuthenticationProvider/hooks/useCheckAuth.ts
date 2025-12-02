import { useEffect, useState } from "react";

import authService from "@/shared/lib/service/AuthService";
import { actions as authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";

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
