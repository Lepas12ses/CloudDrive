import { useMutation } from "@tanstack/react-query";

import authService from "@/shared/lib/service/AuthService";
import { actions as authActions } from "@/shared/lib/store/reducers/auth";
import queryClient from "@/shared/api/queryClient";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";

export default function useHeader() {
	const dispatch = useAppDispatch();
	const { mutate } = useMutation(
		{
			mutationKey: ["logout"],
			mutationFn: authService.logout,
			onSuccess: () => {
				dispatch(authActions.setToken(null));
			},
		},
		queryClient
	);

	function onLogout() {
		mutate();
	}

	return {
		onLogout,
	};
}
