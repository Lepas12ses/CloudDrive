import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type SignUpData from "@/models/SignUpData";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import type AuthResponse from "@/models/AuthResponse";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/http";
import authService from "@/service/AuthService";

export default function useSignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { error, isError, isPending, mutate } = useMutation<
		AuthResponse,
		ApiErrorResponse,
		SignUpData
	>(
		{
			mutationKey: ["sign-up"],
			mutationFn: authService.register,
			onSuccess: data => {
				dispatch(authActions.setToken(data.accessToken));
				navigate("/");
			},
		},
		queryClient
	);

	function onSignUp(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(fd.entries());

		const dataToSend: SignUpData = {
			login: data.login as string,
			email: data.email as string,
			password: data.password as string,
		};

		mutate(dataToSend);
	}

	return {
		onSignUp,
		error,
		isError,
		isPending,
	};
}
