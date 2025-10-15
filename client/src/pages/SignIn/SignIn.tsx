import { type FC } from "react";
import { Link } from "react-router-dom";

import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useSignIn from "./useSignIn";

const SignInPage: FC = () => {
	const { onSignIn } = useSignIn();

	return (
		<Form onSubmit={onSignIn} title='Авторизация'>
			<Input id='login' label='Логин' />
			<Input id='password' type='password' label='Пароль' />
			<Button>Войти</Button>
			<Link
				className='m-auto w-fit text-blue-500 hover:underline'
				to='/auth/sign-up'
			>
				У меня нет аккаунта
			</Link>
		</Form>
	);
};

export default SignInPage;
