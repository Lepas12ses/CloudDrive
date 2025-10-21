import { useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type SignUpData from "@/models/SignUpData";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import type AuthResponse from "@/models/AuthResponse";
import { useAppDispatch, useAppSelector } from "@/store";
import { actions as authActions } from "@/store/auth";
import { queryClient } from "@/http";
import authService from "@/service/AuthService";
import type ValidationError from "@/models/ValidationError";

export default function useSignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { token } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (token) {
			navigate("/", { replace: true });
		}
	}, [token, navigate]);

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
				navigate("/", { replace: true });
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

	let formError: string | null = null;
	let validationErrors: ValidationError[] | null = null;

	if (isError && error) {
		if (error.errors) {
			validationErrors = error.errors;
		} else {
			formError = error.message;
		}
	}

	const fieldErrors = {
		loginError: validationErrors?.find(err => err.path === "login")?.msg,
		emailError: validationErrors?.find(err => err.path === "email")?.msg,
		passwordError: validationErrors?.find(err => err.path === "password")?.msg,
		passwordRepeatError: validationErrors?.find(
			err => err.path === "password-repeat"
		)?.msg,
	};

	return {
		onSignUp,
		formError,
		fieldErrors,
		isPending,
	};
}
