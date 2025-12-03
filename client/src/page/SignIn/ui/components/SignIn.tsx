import { type FC } from "react";

import Button from "@/shared/ui/components/Button";
import RouterLink from "@/shared/ui/components/RouterLink";
import Form from "@/shared/ui/components/Form/Form";
import FormProvider from "@/shared/ui/components/Form/FormProvider";
import FieldProvider from "@/shared/ui/components/Form/field/FieldProvider";
import Label from "@/shared/ui/components/Form/field/Label";
import Input from "@/shared/ui/components/Form/field/Input";
import FieldError from "@/shared/ui/components/Form/field/FieldError";
import Container from "@/shared/ui/components/Container";
import FormError from "@/shared/ui/components/Form/FormError";
import useSignIn from "../../lib/hooks/useSignIn";
import signInValidators from "../../lib/validators";

const SignIn: FC = () => {
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
							<div className='flex  flex-col gap-px'>
								<Label>Логин</Label>
								<Input type='text' />
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
						<Button disabled={isPending}>Войти</Button>
					</Form>
					<FormError />
				</FormProvider>
				<RouterLink to={"/sign-up"}>У меня нет аккаунта</RouterLink>
			</Container>
		</div>
	);
};

export default SignIn;
