import type ApiErrorResponse from "@/models/ApiErrorResponse";
import type SignInData from "@/models/SignInData";
import type SignUpData from "@/models/SignUpData";
import authService from "@/service/AuthService";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const client = new QueryClient();

export async function signUp(data: SignUpData) {
	try {
		const response = await authService.register(data);
		return response;
	} catch (err) {
		if (axios.isAxiosError<ApiErrorResponse>(err)) {
			const errResponse = err.response?.data;

			if (errResponse) {
				throw errResponse;
			}

			throw { message: "Что-то пошло не так" };
		}

		throw { message: "Что-то пошло не так" };
	}
}

export async function signIn(data: SignInData) {
	try {
		const response = await authService.login(data);
		return response;
	} catch (err) {
		if (axios.isAxiosError<ApiErrorResponse>(err)) {
			const errResponse = err.response?.data;

			if (errResponse) {
				throw errResponse;
			}

			throw { message: "Что-то пошло не так" };
		}

		throw { message: "Что-то пошло не так" };
	}
}
