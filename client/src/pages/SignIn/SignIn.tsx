import { type FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useSignIn from "./useSignIn";
import type ValidationError from "@/models/ValidationError";
import RouterLink from "@/components/RouterLink";
import Container from "@/components/Container";

const SignInPage: FC = () => {
	const { onSignIn, error, isError, isPending } = useSignIn();

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
	const passwordError = fieldErrors?.find(err => err.path === "password")?.msg;

	return (
		<div className='h-screen flex items-center justify-center'>
			<Form onSubmit={onSignIn} title='Авторизация' error={formError}>
				<Input id='login' label='Логин' error={loginError} />
				<Input
					id='password'
					type='password'
					label='Пароль'
					error={passwordError}
				/>
				<Button
					variants={{ color: "primary", style: "fill" }}
					className='rounded-full'
					disabled={isPending}
				>
					Войти
				</Button>
				<RouterLink className='m-auto w-fit ' to='/sign-up'>
					У меня нет аккаунта
				</RouterLink>
			</Form>
		</div>
	);
};

export default SignInPage;
