import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";

import type SignInData from "@/models/SignInData";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import client, { login } from "@/util/query";

export default function useSignIn() {
	const dispatch = useAppDispatch();
	const { error, isPending, isError, mutate } = useMutation(
		{
			mutationKey: ["login"],
			mutationFn: login,
			onSuccess(data) {
				dispatch(authActions.authenticate(data));
			},
		},
		client
	);

	function signIn(e: FormEvent<HTMLFormElement>) {
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
		error,
		isError,
		isPending,
		signIn,
	};
}
