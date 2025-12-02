import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type SignUpData from "@/models/SignUpData";
import type ApiErrorResponse from "@/models/ApiErrorResponse";
import type AuthResponse from "@/models/AuthResponse";

import { actions as authActions } from "@/shared/lib/store/reducers/auth";
import queryClient from "@/shared/api/queryClient";
import authService from "@/shared/lib/service/AuthService";
import type ValidationError from "@/models/ValidationError";
import type { FieldErrors } from "@/components/shared/Form/model/FieldErrors";
import useAppDispatch from "@/shared/lib/store/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/store/hooks/useAppSelector";

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

	function onSignUp(fd: FormData) {
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
		onSignUp,
		formError,
		fieldErrors,
		isPending,
	};
}
