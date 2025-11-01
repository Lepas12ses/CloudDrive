import { queryClient } from "@/http";
import { useAppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";

import authService from "@/service/AuthService";
import { actions as authActions } from "@/store/auth";

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
