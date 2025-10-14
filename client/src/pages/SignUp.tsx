import type { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import type SignUpData from "../models/SignUpData";

const SignUpPage: FC = () => {
	function signUp(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const fd = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(fd.entries());

		if (data.password !== data["password-repeat"]) return;

		const dataToSend: SignUpData = {
			login: data.login as string,
			email: data.email as string,
			password: data.password as string,
		};

		console.log(dataToSend);
	}

	return (
		<div className='bg-stone-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-2xl border-2 border-stone-300 gap-3 min-w-1/4'>
			<h1 className='text-3xl'>Регистрация</h1>
			<form className='flex flex-col gap-2 w-full' onSubmit={signUp}>
				<div className='flex flex-col gap-1'>
					<label htmlFor='login'>Логин</label>
					<input
						className='bg-stone-200 border border-stone-300'
						type='text'
						id='login'
						name='login'
						required
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='email'>Электронная почта</label>
					<input
						className='bg-stone-200 border border-stone-300'
						type='email'
						id='email'
						name='email'
						required
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='password'>Пароль</label>
					<input
						className='bg-stone-200 border border-stone-300'
						type='password'
						id='password'
						name='password'
						required
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='password-repeat'>Повторите пароль</label>
					<input
						className='bg-stone-200 border border-stone-300'
						type='password'
						id='password-repeat'
						name='password-repeat'
						required
					/>
				</div>
				<button className='mt-2 px-4 py-2 bg-blue-400 text-white font-bold rounded-sm hover:opacity-50 cursor-pointer'>
					Зарегистрироваться
				</button>
			</form>
			<Link className='text-blue-500 hover:underline' to='/auth/sign-in'>
				У меня уже есть аккаунт
			</Link>
		</div>
	);
};

export default SignUpPage;
