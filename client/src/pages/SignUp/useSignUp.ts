import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import authService from "@/service/AuthService";
import { useAppDispatch } from "@/store";
import { actions as authActions } from "@/store/auth";
import type SignUpData from "@/models/SignUpData";

export default function useSignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function onSignUp(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(fd.entries());

		const dataToSend: SignUpData = {
			login: data.login as string,
			email: data.email as string,
			password: data.password as string,
		};

		const result = await authService.register(dataToSend);
		dispatch(authActions.setToken(result.accessToken));
		navigate("/");
	}

	return {
		onSignUp,
	};
}
