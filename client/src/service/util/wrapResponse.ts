import axios from "axios";

import type ApiErrorResponse from "@/models/ApiErrorResponse";

export default async function wrapResponse<T>(fn: () => Promise<T>) {
	try {
		const data = await fn();
		return data;
	} catch (err) {
		if (axios.isAxiosError<ApiErrorResponse>(err)) {
			const errResponse = err.response?.data;

			if (errResponse) {
				throw errResponse;
			}
		}

		throw { message: "Что-то пошло не так" };
	}
}
