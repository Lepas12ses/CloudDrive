import { type FC } from "react";

import { SignInForm } from "@/widget/SignInForm";

const SignIn: FC = () => {
	return (
		<div className='h-screen flex items-center justify-center'>
			<SignInForm />
		</div>
	);
};

export default SignIn;
