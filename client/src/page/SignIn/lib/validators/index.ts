import type Validator from "@/shared/ui/components/Form/model/Validator";

const signInValidators: Validator[] = [
	{
		field: "login",
		valid: fields => {
			const field = fields.get("login");
			if (!field) return false;

			if (typeof field !== "string") return false;

			if (!field.length) return false;

			return true;
		},
		failMessage: "Введите логин",
	},
	{
		field: "password",
		valid: fields => {
			const field = fields.get("password");
			if (!field) return false;

			if (typeof field !== "string") return false;

			if (!field.length) return false;

			return true;
		},
		failMessage: "Введите пароль",
	},
];

export default signInValidators;
