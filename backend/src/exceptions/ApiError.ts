export default class ApiError<T> extends Error {
	status: number;
	errors?: T[];

	constructor(status: number, message?: string, errors?: T[]) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static BadRequest<T>(message?: string, errors?: T[]) {
		return new ApiError<T>(400, message, errors);
	}

	static Unauthorized() {
		return new ApiError(401, "Пользователь не авторизован");
	}
}
