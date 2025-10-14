import { type FC } from "react";
import { Link } from "react-router-dom";

import useSignIn from "./useSignIn";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

const SignInPage: FC = () => {
	const { error, isError, isPending, signIn } = useSignIn();

	return (
		<Form onSubmit={signIn} title='Авторизация'>
			<Input id='login' label='Логин' />
			<Input id='password' type='password' label='Пароль' />
			<Button>Войти</Button>
			<Link className='text-blue-500 hover:underline' to='/auth/sign-up'>
				У меня нет аккаунта
			</Link>
		</Form>
	);
};

export default SignInPage;
