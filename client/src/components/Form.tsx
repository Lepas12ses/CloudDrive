import type { FC, FormEvent, PropsWithChildren } from "react";

interface FormProps extends PropsWithChildren {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	title?: string;
	formError?: React.ReactNode;
}

const Form: FC<FormProps> = ({ children, onSubmit, title, formError }) => {
	return (
		<div className='bg-stone-100 rounded-xl px-4 py-2 flex flex-col items-center shadow-2xl border-2 border-stone-300 gap-3 min-w-1/4'>
			{title && <h1 className='text-3xl'>{title}</h1>}
			<form className='flex flex-col gap-2 w-full' onSubmit={onSubmit}>
				{children}
			</form>
			{formError}
		</div>
	);
};

export default Form;
