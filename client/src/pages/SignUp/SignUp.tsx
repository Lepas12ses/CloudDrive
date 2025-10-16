import type { FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useSignUp from "./useSignUp";
import type ValidationError from "@/models/ValidationError";
import RouterLink from "@/components/RouterLink";

const SignUpPage: FC = () => {
	const { onSignUp, error, isError, isPending } = useSignUp();

	let formError: string | null = null;
	let fieldErrors: ValidationError[] | null = null;

	if (isError && error) {
		if (error.errors) {
			fieldErrors = error.errors;
		} else {
			formError = error.message;
		}
	}

	const loginError = fieldErrors?.find(err => err.path === "login")?.msg;
	const emailError = fieldErrors?.find(err => err.path === "email")?.msg;
	const passwordError = fieldErrors?.find(err => err.path === "password")?.msg;
	const passwordRepeatError = fieldErrors?.find(
		err => err.path === "password-repeat"
	)?.msg;

	return (
		<Form onSubmit={onSignUp} title='Регистрация' error={formError}>
			<Input id='login' label='Логин' error={loginError} />
			<Input id='email' label='Почта' error={emailError} />
			<Input
				id='password'
				type='password'
				label='Пароль'
				error={passwordError}
			/>
			<Input
				id='password-repeat'
				type='password'
				label='Повторите пароль'
				error={passwordRepeatError}
			/>
			<Button disabled={isPending}>Зарегистрироваться</Button>
			<RouterLink className='m-auto w-fit ' to='/sign-in'>
				У меня нет аккаунта
			</RouterLink>
		</Form>
	);
};

export default SignUpPage;
