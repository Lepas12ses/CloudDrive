import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type SignInData from "@/models/SignInData";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import { client, signIn } from "@/http/query";
import type AuthResponse from "@/models/AuthResponse";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import { useMutation } from "@tanstack/react-query";

export default function useSignIn() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { error, isError, isPending, mutate } = useMutation<
		AuthResponse,
		ApiErrorResponse,
		SignInData
	>(
		{
			mutationKey: ["sign-in"],
			mutationFn: signIn,
			onSuccess: data => {
				dispatch(authActions.setToken(data.accessToken));
				navigate("/");
			},
		},
		client
	);

	async function onSignIn(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(fd.entries());

		const dataToSend: SignInData = {
			login: data.login as string,
			password: data.password as string,
		};

		mutate(dataToSend);
	}

	return {
		onSignIn,
		error,
		isError,
		isPending,
	};
}
