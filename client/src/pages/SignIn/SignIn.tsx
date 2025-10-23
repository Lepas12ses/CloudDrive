import { type FC } from "react";

import Form from "@/components/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/shared/Button";
import useSignIn from "./useSignIn";
import RouterLink from "@/components/RouterLink";
import InputLabel from "@/components/Input/InputLabel";
import InputField from "@/components/Input/InputField";
import InputError from "@/components/Input/InputError";

const SignInPage: FC = () => {
	const { onSignIn, formError, fieldErrors, isPending } = useSignIn();

	return (
		<div className='h-screen flex items-center justify-center'>
			<Form onSubmit={onSignIn} error={formError}>
				<h1 className='text-3xl'>Авторизация</h1>
				<Input id='login' className='gap-1 flex flex-col rounded-md'>
					<InputLabel>Логин</InputLabel>
					<InputField type='text' />
					{fieldErrors.loginError && (
						<InputError>{fieldErrors.loginError}</InputError>
					)}
				</Input>
				<Input id='password'>
					<InputLabel>Пароль</InputLabel>
					<InputField type='password' />
					{fieldErrors.passwordError && (
						<InputError>{fieldErrors.passwordError}</InputError>
					)}
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
