import { type FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import useSignIn from "./useSignIn";
import type ValidationError from "@/models/ValidationError";
import RouterLink from "@/components/RouterLink";
import InputLabel from "@/components/Input/InputLabel";
import InputField from "@/components/Input/InputField";
import InputError from "@/components/Input/InputError";

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
			<Form onSubmit={onSignIn} error={formError}>
				<h1 className='text-3xl'>Авторизация</h1>
				<Input id='login' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Логин</InputLabel>
					<InputField type='text' />
					{loginError && <InputError>{loginError}</InputError>}
				</Input>
				<Input id='password'>
					<InputLabel>Пароль</InputLabel>
					<InputField type='password' />
					{passwordError && <InputError>{passwordError}</InputError>}
				</Input>
				<Button
					variants={{ color: "primary", style: "fill" }}
					className='rounded-full mt-4'
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
