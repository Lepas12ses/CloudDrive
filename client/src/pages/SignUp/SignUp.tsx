import type { FC } from "react";

import Container from "@/components/shared/Container";
import FormProvider from "@/components/shared/Form/FormProvider";
import Form from "@/components/shared/Form/Form";
import FieldProvider from "@/components/shared/Form/field/FieldProvider";
import Label from "@/components/shared/Form/field/Label";
import Input from "@/components/shared/Form/field/Input";
import FieldError from "@/components/shared/Form/field/FieldError";
import Button from "@/components/shared/Button";
import RouterLink from "@/components/RouterLink";
import signUpValidators from "./signUpValidators";
import useSignUp from "./useSignUp";

const SignUpPage: FC = () => {
	const { onSignUp, formError, fieldErrors, isPending } = useSignUp();

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Container
				variants={{ shadow: "l" }}
				className='rounded-xl flex flex-col items-center gap-2'
			>
				<h1 className='font-bold text-2xl'>Регистрация</h1>
				<FormProvider
					onSubmit={onSignUp}
					validators={signUpValidators}
					errors={fieldErrors}
					formError={formError}
				>
					<Form variants={{ gap: "m" }}>
						<FieldProvider id='login'>
							<div className='flex  flex-col gap-0.25'>
								<Label>Логин</Label>
								<Input type='text' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='email'>
							<div className='flex  flex-col gap-0.25'>
								<Label>Почта</Label>
								<Input type='email' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='password'>
							<div className='flex  flex-col gap-0.25'>
								<Label>Пароль</Label>
								<Input type='password' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='password-repeat'>
							<div className='flex  flex-col gap-0.25'>
								<Label>Пароль</Label>
								<Input type='password' />
								<FieldError />
							</div>
						</FieldProvider>
						<Button disabled={isPending}>Отправить</Button>
					</Form>
				</FormProvider>
				<RouterLink to={"/sign-in"}>У меня уже есть аккаунт</RouterLink>
			</Container>
		</div>
	);
};

export default SignUpPage;
