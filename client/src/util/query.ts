import { QueryClient } from "@tanstack/react-query";
import type SignInData from "../models/SignInData";
import authService from "../service/AuthService";
import axios from "axios";
import type ApiErrorResponse from "../models/ApiErrorResponse";

const client = new QueryClient();

export async function login(data: SignInData) {
	try {
		const result = await authService.login(data);
		return result;
	} catch (err) {
		if (axios.isAxiosError<ApiErrorResponse>(err)) {
			const message = err.response?.data.message;
			// const errors = err.response?.data.errors;

			throw new Error(message);
		}
		throw new Error("Что-то пошло не так");
	}
}

export default client;
