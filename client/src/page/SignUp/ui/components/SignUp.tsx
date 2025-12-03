import type { FC } from "react";

import Container from "@/shared/ui/components/Container";
import FormProvider from "@/shared/ui/components/Form/FormProvider";
import Form from "@/shared/ui/components/Form/Form";
import FieldProvider from "@/shared/ui/components/Form/field/FieldProvider";
import Label from "@/shared/ui/components/Form/field/Label";
import Input from "@/shared/ui/components/Form/field/Input";
import FieldError from "@/shared/ui/components/Form/field/FieldError";
import Button from "@/shared/ui/components/Button";
import RouterLink from "@/shared/ui/components/RouterLink";
import useSignUp from "../../lib/hooks/useSignUp";
import signUpValidators from "../../lib/validators";

const SignUp: FC = () => {
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
							<div className='flex  flex-col gap-px'>
								<Label>Логин</Label>
								<Input type='text' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='email'>
							<div className='flex  flex-col gap-px'>
								<Label>Почта</Label>
								<Input type='email' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='password'>
							<div className='flex  flex-col gap-px'>
								<Label>Пароль</Label>
								<Input type='password' />
								<FieldError />
							</div>
						</FieldProvider>
						<FieldProvider id='password-repeat'>
							<div className='flex  flex-col gap-px'>
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

export default SignUp;
