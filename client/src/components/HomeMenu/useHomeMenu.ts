import { queryClient } from "@/http";
import authService from "@/service/AuthService";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";

export default function useHomeMenu() {
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
