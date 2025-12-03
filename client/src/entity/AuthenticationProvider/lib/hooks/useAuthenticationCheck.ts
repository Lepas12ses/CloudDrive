import { useEffect, useState } from "react";

import { authActions } from "@/shared/lib/store/reducers/auth";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import checkAuth from "../../api/checkAuth";

export default function useAuthenticationCheck() {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function check() {
			try {
				const result = await checkAuth();
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
