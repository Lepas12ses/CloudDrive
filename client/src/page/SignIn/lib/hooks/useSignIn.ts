import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type SignInData from "@/models/SignInData";
import { actions as authActions } from "@/shared/lib/store/reducers/auth";
import type AuthResponse from "@/models/AuthResponse";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import authService from "@/shared/lib/service/AuthService";
import type ValidationError from "@/models/ValidationError";
import type { FieldErrors } from "@/components/shared/Form/model/FieldErrors";
import queryClient from "@/shared/api/queryClient";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/store/hooks/useAppSelector";

export default function useSignIn() {
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
		SignInData
	>(
		{
			mutationKey: ["sign-in"],
			mutationFn: authService.login,
			onSuccess: data => {
				dispatch(authActions.setToken(data.accessToken));
				navigate("/", { replace: true });
			},
		},
		queryClient
	);

	async function onSignIn(fd: FormData) {
		const data = Object.fromEntries(fd.entries());

		const dataToSend: SignInData = {
			login: data.login as string,
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

	const fieldErrors: FieldErrors = new Map();
	validationErrors?.forEach(error => {
		const fieldError = fieldErrors.get(error.path);
		if (fieldError) {
			fieldError.messages.push(error.msg);
			return;
		}
		fieldErrors.set(error.path, {
			messages: [error.msg],
		});
	});

	return {
		onSignIn,
		formError,
		fieldErrors,
		isPending,
	};
}
