import type Validator from "@/shared/ui/components/Form/model/Validator";

const signUpValidators: Validator[] = [
	{
		field: "login",
		valid: fields => {
			const field = fields.get("login");
			if (field === undefined) return false;

			if (typeof field !== "string") return false;

			if (field.length < 1 || field.length > 32) return false;

			return true;
		},
		failMessage: "Логин должен состоять минимум из 1 и максимум из 32 символов",
	},
	{
		field: "email",
		valid: fields => {
			const field = fields.get("email");
			if (field === undefined) return false;

			if (typeof field !== "string") return false;

			if (!field.match(/^.{1,}@.{2,}\..{2,}$/)) return false;

			return true;
		},
		failMessage: "Введите корректную почту",
	},
	{
		field: "password",
		valid: fields => {
			const field = fields.get("password");
			if (field === undefined) return false;

			if (typeof field !== "string") return false;

			if (field.length < 3 || field.length > 32) return false;

			return true;
		},
		failMessage:
			"Пароль должен состоять минимум из 3 и максимум из 32 символов",
	},
	{
		field: "password-repeat",
		valid: fields => {
			const password = fields.get("password");
			const passwordRepeat = fields.get("password-repeat");
			if (password === undefined || passwordRepeat === undefined) return false;

			if (typeof password !== "string" || typeof passwordRepeat !== "string")
				return false;

			if (password != passwordRepeat) return false;

			return true;
		},
		failMessage: "Пароли не совпадают",
	},
];

export default signUpValidators;
