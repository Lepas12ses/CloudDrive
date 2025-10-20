import type { FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import useSignUp from "./useSignUp";
import type ValidationError from "@/models/ValidationError";
import RouterLink from "@/components/RouterLink";
import InputLabel from "@/components/Input/InputLabel";
import InputField from "@/components/Input/InputField";
import InputError from "@/components/Input/InputError";

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
		<div className='min-h-screen flex items-center justify-center'>
			<Form onSubmit={onSignUp} error={formError}>
				<h1 className='text-3xl'>Регистрация</h1>
				<Input id='login' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Логин</InputLabel>
					<InputField type='text' />
					{loginError && <InputError>{loginError}</InputError>}
				</Input>
				<Input id='email' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Почта</InputLabel>
					<InputField type='email' />
					{emailError && <InputError>{emailError}</InputError>}
				</Input>
				<Input id='password' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Пароль</InputLabel>
					<InputField type='password' />
					{passwordError && <InputError>{passwordError}</InputError>}
				</Input>
				<Input id='password-repeat' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Повторите пароль</InputLabel>
					<InputField type='password' />
					{passwordRepeatError && (
						<InputError>{passwordRepeatError}</InputError>
					)}
				</Input>
				<Button
					variants={{ color: "primary", style: "fill" }}
					className='rounded-full mt-4'
					disabled={isPending}
				>
					Зарегистрироваться
				</Button>
				<RouterLink className='m-auto w-fit ' to='/sign-in'>
					У меня нет аккаунта
				</RouterLink>
			</Form>
		</div>
	);
};

export default SignUpPage;
