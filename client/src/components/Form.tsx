import type { FC, FormEvent, PropsWithChildren } from "react";

import Container from "./shared/Container";

interface FormProps extends PropsWithChildren {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	error?: React.ReactNode;
}

const Form: FC<FormProps> = ({ children, onSubmit, error }) => {
	return (
		<Container
			variants={{ padding: "m", shadow: "m" }}
			className='rounded-lg flex flex-col gap-3'
		>
			<form className='flex flex-col gap-2 w-full' onSubmit={onSubmit}>
				{children}
			</form>
			{error && (
				<p className='bg-red-200 text-red-800 font-bold rounded-md py-1 px-2'>
					{error}
				</p>
			)}
		</Container>
	);
};

export default Form;
