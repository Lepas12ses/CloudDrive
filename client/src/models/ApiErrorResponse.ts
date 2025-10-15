import type ValidationError from "./ValidationError";

export default interface ApiErrorResponse {
	message: string;
	errors?: ValidationError[];
}
