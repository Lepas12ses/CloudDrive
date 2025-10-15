import type { FC } from "react";
import { Link } from "react-router-dom";

import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useSignUp from "./useSignUp";

const SignUpPage: FC = () => {
	const { onSignUp } = useSignUp();

	return (
		<Form onSubmit={onSignUp} title='Регистрация'>
			<Input id='login' label='Логин' />
			<Input id='email' label='Почта' />
			<Input id='password' type='password' label='Пароль' />
			<Input id='password-repeat' type='password' label='Повторите пароль' />
			<Button>Зарегистрироваться</Button>
			<Link
				className='m-auto w-fit text-blue-500 hover:underline'
				to='/auth/sign-in'
			>
				У меня уже есть аккаунт
			</Link>
		</Form>
	);
};

export default SignUpPage;
