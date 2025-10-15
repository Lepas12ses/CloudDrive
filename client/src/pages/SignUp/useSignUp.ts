import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import type SignUpData from "@/models/SignUpData";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import { useMutation } from "@tanstack/react-query";
import { client, signUp } from "@/http/query";
import type AuthResponse from "@/models/AuthResponse";

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
			mutationFn: signUp,
			onSuccess: data => {
				dispatch(authActions.setToken(data.accessToken));
				navigate("/");
			},
		},
		client
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
