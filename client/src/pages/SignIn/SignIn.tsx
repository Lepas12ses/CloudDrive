import { type FC } from "react";

import Button from "@/components/shared/Button";
import useSignIn from "./useSignIn";
import RouterLink from "@/components/RouterLink";
import Form from "@/components/shared/Form/Form";
import FormProvider from "@/components/shared/Form/FormProvider";
import FieldProvider from "@/components/shared/Form/field/FieldProvider";
import Label from "@/components/shared/Form/field/Label";
import Input from "@/components/shared/Form/field/Input";
import FieldError from "@/components/shared/Form/field/FieldError";
import Container from "@/components/shared/Container";
import signInValidators from "./signInValidators";
import FormError from "@/components/shared/Form/FormError";

const SignInPage: FC = () => {
	const { onSignIn, formError, fieldErrors, isPending } = useSignIn();

	return (
		<div className='h-screen flex items-center justify-center'>
			<Container
				variants={{ shadow: "l" }}
				className='rounded-xl flex flex-col items-center gap-2'
			>
				<h1 className='font-bold text-2xl'>Авторизация</h1>
				<FormProvider
					onSubmit={onSignIn}
					validators={signInValidators}
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
						<FieldProvider id='password'>
							<div className='flex  flex-col gap-0.25'>
								<Label>Пароль</Label>
								<Input type='password' />
								<FieldError />
							</div>
						</FieldProvider>
						<Button>Отправить</Button>
					</Form>
					<FormError />
				</FormProvider>
				<RouterLink to={"/sign-up"}>У меня нет аккаунта</RouterLink>
			</Container>
		</div>
	);
};

export default SignInPage;
