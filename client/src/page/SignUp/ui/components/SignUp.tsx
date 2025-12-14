import type { FC } from "react";

import { SignUpForm } from "@/widget/SignUpForm";

const SignUp: FC = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<SignUpForm />
		</div>
	);
};

export default SignUp;
