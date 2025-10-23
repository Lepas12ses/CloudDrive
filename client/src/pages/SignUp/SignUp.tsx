import type { FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/shared/Button";
import useSignUp from "./useSignUp";
import RouterLink from "@/components/RouterLink";
import InputLabel from "@/components/Input/InputLabel";
import InputField from "@/components/Input/InputField";
import InputError from "@/components/Input/InputError";

const SignUpPage: FC = () => {
	const { onSignUp, formError, fieldErrors, isPending } = useSignUp();

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Form onSubmit={onSignUp} error={formError}>
				<h1 className='text-3xl'>Регистрация</h1>
				<Input id='login' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Логин</InputLabel>
					<InputField type='text' />
					{fieldErrors.loginError && (
						<InputError>{fieldErrors.loginError}</InputError>
					)}
				</Input>
				<Input id='email' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Почта</InputLabel>
					<InputField type='email' />
					{fieldErrors.emailError && (
						<InputError>{fieldErrors.emailError}</InputError>
					)}
				</Input>
				<Input id='password' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Пароль</InputLabel>
					<InputField type='password' />
					{fieldErrors.passwordError && (
						<InputError>{fieldErrors.passwordError}</InputError>
					)}
				</Input>
				<Input id='password-repeat' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Повторите пароль</InputLabel>
					<InputField type='password' />
					{fieldErrors.passwordRepeatError && (
						<InputError>{fieldErrors.passwordRepeatError}</InputError>
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
					У меня есть аккаунт
				</RouterLink>
			</Form>
		</div>
	);
};

export default SignUpPage;
