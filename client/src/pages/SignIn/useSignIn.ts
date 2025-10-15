import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type SignInData from "@/models/SignInData";
import authService from "@/service/AuthService";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";

export default function useSignIn() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function onSignIn(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(fd.entries());

		const dataToSend: SignInData = {
			login: data.login as string,
			password: data.password as string,
		};

		const result = await authService.login(dataToSend);
		dispatch(authActions.setToken(result.accessToken));
		navigate("/");
	}

	return {
		onSignIn,
	};
}
