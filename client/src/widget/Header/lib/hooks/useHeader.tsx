import { useMutation } from "@tanstack/react-query";

import { authActions } from "@/shared/lib/store/reducers/auth";
import queryClient from "@/shared/api/queryClient";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import logout from "../../api/logout";

export default function useHeader() {
	const dispatch = useAppDispatch();
	const { mutate } = useMutation(
		{
			mutationKey: ["logout"],
			mutationFn: logout,
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
