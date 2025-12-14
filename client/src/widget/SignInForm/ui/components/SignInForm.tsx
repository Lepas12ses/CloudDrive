import type { FC } from "react";

import Button from "@/shared/ui/components/Button";
import Container from "@/shared/ui/components/Container";
import FieldError from "@/shared/ui/components/Form/field/FieldError";
import FieldProvider from "@/shared/ui/components/Form/field/FieldProvider";
import Input from "@/shared/ui/components/Form/field/Input";
import Label from "@/shared/ui/components/Form/field/Label";
import Form from "@/shared/ui/components/Form/Form";
import FormError from "@/shared/ui/components/Form/FormError";
import FormProvider from "@/shared/ui/components/Form/FormProvider";
import RouterLink from "@/shared/ui/components/RouterLink";
import useSignIn from "../../lib/hooks/useSignIn";
import signInValidators from "../../lib/helper/signInValidators";

const SignInForm: FC = () => {
	const { onSignIn, formError, fieldErrors, isPending } = useSignIn();

	return (
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
	);
};

export default SignInForm;
